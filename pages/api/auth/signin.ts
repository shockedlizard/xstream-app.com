import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import bcrypt from 'bcrypt';
import { signIn } from "next-auth/react";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== "POST") {
       return res.status(405).json({ error: "Method tidak diizinkan" });
   }
    try {
       const { email, password } = req.body;
        // Validasi input
       if (!email || !password) {
           return res.status(400).json({ error: "Email dan password diperlukan" });
       }
        // Cari user
       const user = await prisma.user.findUnique({
           where: { email }
       });
        if (!user) {
           return res.status(401).json({ error: "Email atau password salah" });
       }
        // Verifikasi password
       const isValid = await bcrypt.compare(password, user.password);
       if (!isValid) {
           return res.status(401).json({ error: "Email atau password salah" });
       }
        // Gunakan NextAuth signin
       const result = await signIn("credentials", {
           redirect: false,
           email,
           password,
       });
        if (result?.error) {
           return res.status(401).json({ error: result.error });
       }
        return res.status(200).json({ success: true });
    } catch (error) {
       console.error("Sign in error:", error);
       return res.status(500).json({ error: "Terjadi kesalahan saat login" });
   }
}