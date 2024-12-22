import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { AuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "../../../lib/prisma"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email dan password diperlukan");
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });
                if (!user) {
                    throw new Error("Email atau password salah");
                }
                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isPasswordValid) {
                    throw new Error("Email atau password salah");
                }
                return {
                    id: user.id,
                    email: user.email ?? "",
                    name: user.name ?? "",
                    image: user.image ?? null,
                };
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {  // Tambahkan null check
                session.user = {  // Definisikan struktur user secara eksplisit
                    ...session.user,
                    id: token.id as string,
                };
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);