import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import { getXtrBalance } from "../function";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session?.user?.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const { destinationAddress, amount, network } = req.body;
        console.log(req.body);
        
        if (!destinationAddress || !amount) {
            return res.status(400).json({ error: "Destination address and amount are required" });
        }
        const userWallet = await prisma.wallet.findUnique({
            where: { userId: session.user.id }
        });
        if (!userWallet) {
            return res.status(404).json({ error: "Wallet not found" });
        }

        const balance = await getXtrBalance(userWallet.address);
        if (balance-Number(userWallet.pendingTransfer || 0) < amount) {
            return res.status(400).json({ error: "Insufficient balance" });
        }

        await prisma.walletHistory.create({
            data: {
                walletId: userWallet.address,
                from: userWallet.address,
                to: destinationAddress,
                value: amount.toString(),
                timestamp: (Date.now() / 1000).toString(),
                type: 'send',
                status: 'WAITING'
            }
        });

        await prisma.wallet.update({
            where: { address: userWallet.address },
            data: { pendingTransfer: amount.toString() }
        });

        return res.status(200).json({
            success: true
        });

    } catch (error: any) {
        console.error('Transfer error:', error);
        return res.status(500).json({
            error: "Transfer failed",
            message: error.message
        });
    }
}
    
