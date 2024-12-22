// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { createEthAddress, encrypt, getBnbBalance, getXtrBalance, xtrHistory } from "../function";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(401).json({ error: "unauthorized" })
    }
    const userId = session.user.id
    if (!userId) {
        return res.status(401).json({ error: "user id not found" })
    }
    if (req.method === 'GET') {
        const userWallet = await prisma.wallet.findUnique({
            where: { userId: userId as string },
            select: {
                address: true,
                bnbBalance: true,
                xtrBalance: true,
                history: true,
                pendingTransfer: true
            }
        });
        if (!userWallet) {
            const address = await createEthAddress();
            const wallet = await prisma.wallet.create({
                data: {
                    address: address.address,
                    privateKey: await encrypt(address.privateKey),
                    userId: userId,
                    bnbBalance: "0",
                    xtrBalance: "0",
                    pendingTransfer: "0"
                }
            });
            const data = {
                address: wallet.address,
                bnbBalance: 0,
                xtrBalance: 0,
                xtrHistory: [],
                pendingTransfer: 0
            }

            res.status(200).json(data);
        } else {
            const currentBalance = await getXtrBalance(userWallet.address);
            const currentBnbBalance = await getBnbBalance(userWallet.address);


            if (Number(currentBalance) !== Number(userWallet.xtrBalance)) {
                const getXtrHistory = await xtrHistory(userWallet.address);
                console.log(getXtrHistory)
                if (getXtrHistory && getXtrHistory.length > 0) {  // Tambah check
                    const existingTransactions = await prisma.walletHistory.findMany({
                        where: {
                            walletId: userWallet.address,  // Tambah walletId
                            blockNumber: {
                                in: getXtrHistory.map((item: any) => BigInt(item.blockNumber))  // Konversi ke BigInt
                            }
                        },
                        select: {
                            blockNumber: true
                        }
                    });
                    const existingBlockNumbers = new Set(
                        existingTransactions.map(tx => tx.blockNumber ? tx.blockNumber.toString() : null)
                    );
                    const newTransactions = getXtrHistory.filter(
                        (item: any) => !existingBlockNumbers.has(item.blockNumber ? item.blockNumber.toString() : null)
                    );
                    if (newTransactions.length > 0) {
                        await prisma.walletHistory.createMany({
                            data: newTransactions.map((item: any) => ({
                                walletId: userWallet.address,  // Tambah walletId
                                transactionHash: item.transactionHash,
                                from: item.from,
                                to: item.to,
                                value: item.value,
                                blockNumber: BigInt(item.blockNumber),  // Konversi ke BigInt
                                timestamp: item.timestamp,
                                date: item.date,
                                type: item.type,
                                status: item.status,
                                gas: item.gas
                            }))
                        });
                    }
                    await prisma.wallet.update({
                        where: { address: userWallet.address },
                        data: {
                            xtrBalance: currentBalance.toString()
                        }
                    });
                }
            }

            const history = await prisma.walletHistory.findMany({
                where: {
                    walletId: userWallet.address
                }
            });

            const formattedHistory = history.map((item: any) => ({
                ...item,
                blockNumber: item.blockNumber ? item.blockNumber.toString() : null // Konversi BigInt ke string
            }));

            const data = {
                address: userWallet.address,
                bnbBalance: currentBnbBalance,
                xtrBalance: currentBalance,
                xtrHistory: formattedHistory,
                pendingTransfer: userWallet.pendingTransfer
            }
            res.status(200).json(data);
        }

    } else if (req.method === 'POST') {
        res.status(200).json({ name: "John Doe" });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}

