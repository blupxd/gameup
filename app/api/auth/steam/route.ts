import { getSteamAuthenticationURL } from "@/utils/auth/steam";
import { NextResponse } from "next/server";

export async function GET() {
  const authenticationURL = await getSteamAuthenticationURL();

  if (authenticationURL) return NextResponse.json({ authenticationURL });
}
