import { getXtrBalance } from "../function";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === 'POST') {
        try {
            const { packageId, amount } = req.body;
            console.log(req.body)
            if (!packageId || !amount) {
                return res.status(400).json({ error: "Invalid request" });
            }

            const stakingPackage = await prisma.stakingPackage.findUnique({
                where: {
                    id: packageId
                }
            });
            const userWallet = await prisma.wallet.findUnique({
                where: {
                    userId: session.user.id
                }
            });
            if (!userWallet) {
                return res.status(400).json({ error: "Wallet not found" });
            }
            if (!stakingPackage) {
                return res.status(400).json({ error: "Staking package not found" });
            }
            const balance = await getXtrBalance(userWallet.address);
            if (balance - Number(userWallet.pendingTransfer || 0) < amount) {
                return res.status(400).json({ error: "Insufficient balance" });
            }
            const staking = await prisma.staking.create({
                data: {
                    userId: session.user.id,
                    packageId: stakingPackage.id,
                    status: 'PENDING',
                    amount: amount.toString()
                }
            });

            await prisma.walletHistory.create({
                data: {
                    walletId: userWallet.address,
                    transactionHash: '0x0', // Tambahkan ini
                    blockNumber: BigInt(0), // Tambahkan ini
                    from: userWallet.address,
                    to: process.env.STAKING_DESTINATION_ADDRESS || '',
                    value: amount.toString(),
                    timestamp: (Date.now() / 1000).toString(),
                    date: new Date().toISOString(), // Tambahkan ini
                    type: 'new-staking',
                    status: 'WAITING'
                }
            });

            return res.status(201).json(staking);
        } catch (error) {
            console.error('Create staking error:', error);
            return res.status(500).json({ error: "Failed to create staking" });
        }
    }

    else if (req.method === 'GET') {
        try {
            const stakings = await prisma.staking.findMany({
                where: {
                    userId: session.user.id,
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    package: true
                }
            });
            return res.status(200).json(stakings);
        } catch (error) {
            console.error('Fetch stakings error:', error);
            return res.status(500).json({ error: "Failed to fetch stakings" });
        }
    }
    else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}