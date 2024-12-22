import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const { id } = req.query;
    if (req.method === 'POST') {
        try {
            const { message } = req.body;
            // Verify ticket exists and is open
            const ticket = await prisma.supportTicket.findUnique({
                where: { id: id as string }
            });
            if (!ticket) {
                return res.status(404).json({ error: "Ticket not found" });
            }
            if (ticket.status === 'CLOSED') {
                return res.status(400).json({ error: "Cannot reply to closed ticket" });
            }
            // Create reply
            const reply = await prisma.ticketReply.create({
                data: {
                    ticketId: id as string,
                    userId: session.user.id,
                    message
                }
            });
            // Update ticket status to PENDING if it was OPEN
            if (ticket.status === 'OPEN') {
                await prisma.supportTicket.update({
                    where: { id: id as string },
                    data: { status: 'PENDING' }
                });
            }
            return res.status(201).json(reply);
        } catch (error) {
            console.error('Create reply error:', error);
            return res.status(500).json({ error: "Failed to create reply" });
        }
    }
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
