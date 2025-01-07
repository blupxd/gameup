import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    email: string;
    riotId: string;
    steamid: string;
    regionalRoute: string;
    platformRoute: string;
    epicId: string;
    username: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      riotId: string;
      steamid: string;
      regionalRoute: string;
      platformRoute: string;
      epicId: string;
      username: string;
    } & DefaultSession["user"];
    token: {
      id: string;
      email: string;
      riotId: string;
      steamid: string;
      regionalRoute: string;
      platformRoute: string;
      epicId: string;
      username: string;
    };
  }
}
