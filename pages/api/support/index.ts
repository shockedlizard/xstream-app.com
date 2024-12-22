import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const session = await getServerSession(req, res, authOptions);
   if (!session?.user?.id) {
       return res.status(401).json({ error: "Unauthorized" });
   }
    if (req.method === 'POST') {
       try {
           const { subject, message, priority } = req.body;
           const ticket = await prisma.supportTicket.create({
               data: {
                   userId: session.user.id,
                   subject,
                   message,
                   priority,
                   status: 'OPEN'
               }
           });
           return res.status(201).json(ticket);
       } catch (error) {
           console.error('Create ticket error:', error);
           return res.status(500).json({ error: "Failed to create ticket" });
       }
   } 
   
   else if (req.method === 'GET') {
       try {
           const tickets = await prisma.supportTicket.findMany({
               where: {
                   userId: session.user.id
               },
               orderBy: {
                   createdAt: 'desc'
               }
           });
           return res.status(200).json(tickets);
       } catch (error) {
           console.error('Fetch tickets error:', error);
           return res.status(500).json({ error: "Failed to fetch tickets" });
       }
   } 
   
   else {
       res.setHeader('Allow', ['GET', 'POST']);
       return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
   }
}
