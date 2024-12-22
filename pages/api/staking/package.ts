import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const session = await getServerSession(req, res, authOptions);
   if (!session?.user?.id) {
       return res.status(401).json({ error: "Unauthorized" });
   }
     if (req.method === 'GET') {
       try {
           const stakings = await prisma.stakingPackage.findMany({
               where: {
                   status: 'ACTIVE'
               },
               orderBy: {
                   createdAt: 'desc'
               }
           });
           return res.status(200).json(stakings);
       } catch (error) {
           console.error('Fetch tickets error:', error);
           return res.status(500).json({ error: "Failed to fetch tickets" });
       }
   } 
   
   else {
       res.setHeader('Allow', ['GET']);
       return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
   }
}
