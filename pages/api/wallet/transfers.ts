import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import Web3 from "web3";
import { decrypt } from "../function";

const GASS_FEE_ADDRESS = process.env.GASS_FEE_ADDRESS;
const GASS_FEE_PRIVATE_KEY = process.env.GASS_FEE_PRIVATE_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session?.user?.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const { destinationAddress, amount } = req.body;
        if (!destinationAddress || !amount) {
            return res.status(400).json({ error: "Destination address and amount are required" });
        }
        const userWallet = await prisma.wallet.findUnique({
            where: { userId: session.user.id }
        });
        if (!userWallet) {
            return res.status(404).json({ error: "Wallet not found" });
        }
        const web3 = new Web3(process.env.BSC_PUBLICNODE as string);

        // Setup sponsor wallet
        const SPONSOR_PRIVATE_KEY = process.env.GASS_FEE_PRIVATE_KEY as string;
        const sponsorAccount = web3.eth.accounts.privateKeyToAccount(SPONSOR_PRIVATE_KEY);
        web3.eth.accounts.wallet.add(sponsorAccount);

        const tokenAbi = [
            {
                "constant": false,
                "inputs": [
                    { "name": "_to", "type": "address" },
                    { "name": "_value", "type": "uint256" }
                ],
                "name": "transfer",
                "outputs": [{ "name": "", "type": "bool" }],
                "type": "function"
            }
        ];
        const contract = new web3.eth.Contract(tokenAbi, process.env.TOKEN_ADDRESS);

        // Decrypt private key
        const privateKey = await decrypt(userWallet.privateKey);

        // Setup account
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        web3.eth.accounts.wallet.add(account);

        // Convert amount to wei
        const amountWei = web3.utils.toWei(amount.toString(), 'ether');
        // Build transaction
        const tx = {
           from: sponsorAccount.address,
           to: process.env.TOKEN_ADDRESS,
           gas: 100000,
           data: contract.methods.transferFrom(
               userWallet.address,
               destinationAddress, 
               amountWei
           ).encodeABI()
       };

        const result = await web3.eth.sendTransaction(tx);

        // model WalletHistory {
        //     id              String   @id @default(cuid())
        //     walletId        String   // Tambah ini
        //     blockNumber     BigInt?
        //     transactionHash String?
        //     from            String
        //     to              String
        //     value           String
        //     wallet          Wallet   @relation(fields: [walletId], references: [address])
        //     timestamp       String?
        //     date            String?
        //     type            String
        //     status          Status
        //     gas             String?
        // }

        // Update database jika transaksi berhasil
        await prisma.walletHistory.create({
            data: {
                walletId: userWallet.address,
                transactionHash: result.transactionHash,
                from: userWallet.address,
                to: destinationAddress,
                value: amount.toString(),
                blockNumber: BigInt(result.blockNumber || 0),
                timestamp: (Date.now() / 1000).toString(),
                date: new Date().toISOString(),
                type: 'send',
                status: 'success',
                gas: web3.utils.fromWei(result.gasUsed?.toString() || '0', 'gwei')
            }
        });
        return res.status(200).json({
            success: true,
            transaction: result.transactionHash
        });
        
    } catch (error: any) {
        console.error('Transfer error:', error);
        return res.status(500).json({
            error: "Transfer failed",
            message: error.message
        });
    }
}
