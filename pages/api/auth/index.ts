import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'b7ed336d6a36f70f99b5539ae76b3c6d6fc1b36c89c5947dc1a0c762bb882ca5494e4735e29fdc1b50d9f21fa560c2b37a8a400f978452a279d3c0656143a6c71a8a784bde51bf8c63a693be5bec55a299d81fa18350ff35fe2ea7fa87db01f3205f1750948c87389e2993b9a6859985ebb67d1c24da4b232a4c32588cbdf2fc6716955893a665a5d876aefb3d02a1f826c86cd3d545181c0145227254bd2d8346db63773ced2f94e6b4b3a197c52f8e17666ae87b63b63a2e02c12cf494b815e9c8de1481570cb4c9710761754aae4415af9101cc239efe360e81380aaae0f464d03fa62a19ae7cce0414bed14fe2f690bc285d00a1d527f0d4a1641fa43589';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Error mengambil data users" });
        }
    }
    else if (req.method === "POST") {
        console.log(req.body);
        try {
            const { name, email, password } = req.body;
            console.log(name, email, password);
            if (!email || !password || !name) {
                return res.status(400).json({ error: "Email, password, dan name diperlukan" });
            }
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });
            if (existingUser) {
                return res.status(400).json({ error: "Email sudah terdaftar" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    image: "https://github.com/shadcn.png"
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            const token = jwt.sign(
                { userId: user.id },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
            res.status(201).json({ user, token });
        } catch (error) {
            res.status(500).json({ error: "Error membuat user" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
