import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { getSteamUserIdentifier } from "@/utils/auth/steam";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Ensure session exists to verify if the user is logged in
    const session = await getServerSession(authOptions);
    if (!session) {
      // If session doesn't exist, redirect to login
      return redirect("/login");
    }

    // Retrieve Steam identifier
    const identifier = await getSteamUserIdentifier(request);
    if (!identifier) {
      // If no Steam ID is found, return an error response
      return NextResponse.json({ error: "Steam authentication failed" }, { status: 400 });
    }

    // Update Steam ID in the database for the logged-in user
    const updatedSteamId = await db.user.update({
      where: { id: session.user.id },
      data: { steamid: identifier },
    });

    // Create redirect URL with the steamId for the frontend to use
    const urlRedirect = new URL(request.nextUrl.origin + "/cs2");
    urlRedirect.searchParams.set("steamId", identifier);  // Optional, depends if you still need it in URL

    // Now, let's set the Steam ID into a cookie (make it HttpOnly & Secure)
    const response = NextResponse.redirect(urlRedirect.href);

    response.cookies.set("steamId", identifier, {
      maxAge: 60, // Expiration time (7 days)
      path: '/',         // Cookie is available for the entire domain
    });

    return response;
  } catch (error) {
    console.error("Error during Steam authentication:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
