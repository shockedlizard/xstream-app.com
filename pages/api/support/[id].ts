import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
    }


    if (req.method === 'GET') {
        const { id } = req.query;
        try {
            const ticket = await prisma.supportTicket.findUnique({
                where: { id: id as string },
                include: {
                    replies: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    image: true
                                }
                            }
                        }
                    }
                }
            });
            if (!ticket) {
                return res.status(404).json({ error: "Ticket not found" });
            }
            if (ticket.userId !== session.user.id) {
                return res.status(403).json({ error: "Forbidden" });
            }
            return res.status(200).json(ticket);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch ticket" });
        }
    } else if (req.method === 'PUT') {
        // Update ticket
        const { id } = req.query;
        try {
            const { message } = req.body;
            const ticket = await prisma.supportTicket.update({
                where: {
                    id: id as string,
                    userId: session.user.id
                },
                data: { message }
            });
            return res.status(200).json(ticket);
        } catch (error) {
            return res.status(500).json({ error: "Failed to update ticket" });
        }
    } else if (req.method === 'DELETE') {
        // Delete ticket
        const { id } = req.query;
        try {
            await prisma.supportTicket.delete({
                where: {
                    id: id as string,
                    userId: session.user.id
                }
            });
            return res.status(204).end();
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete ticket" });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
