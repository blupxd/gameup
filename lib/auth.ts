import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (!existingUser) {
          console.log("Nema ovog usera")
          return null;}
        if (
          existingUser &&
          (await compare(credentials.password, existingUser.password))
        ) {
          console.log("dobar si")
          return {
            id: existingUser.id + "",
            email: existingUser.email + "",
            riotId: existingUser.riotId + "",
            steamid: existingUser.steamid + "",
            regionalRoute: existingUser.regionalRoute + "",
            platformRoute: existingUser.platformRoute + "",
            epicId: existingUser.epicId + "",
            username: existingUser.username + "",
          } as any; // Ensure the returned object matches the User type
        } else {
          console.log("Invalid credentials");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          riotId: user.riotId,
          steamid: user.steamid,
          regionalRoute: user.regionalRoute,
          platformRoute: user.platformRoute,
          epicId: user.epicId,
          username: user.username,
        };
      }
      if (trigger === "update" && session) {
        token.email = session.email || token.email;
        token.steamid = session.steamid || token.steamid;
        token.riotId = session.riotId || token.riotId;
        token.regionalRoute = session.regionalRoute || token.regionalRoute;
        token.platformRoute = session.platformRoute || token.platformRoute;
        token.epicId = session.epicId || token.epicId;
        token.username = session.username || token.username;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          riotId: token.riotId,
          steamid: token.steamid,
          regionalRoute: token.regionalRoute,
          platformRoute: token.platformRoute,
          epicId: token.epicId,
          username: token.username,
        },
      };
    },
  },
};
