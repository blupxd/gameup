import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const steamid = searchParams.get("steamid");
  console.log(steamid);
  try {
    if (!steamid)
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 401 }
      );

    const steamResponse = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.NEXT_PUBLIC_STEAM_API_KEY}&steamids=${steamid}`
    );

    if (!steamResponse.ok) {
      console.error(`Steam API error: ${steamResponse.statusText}`);
      return NextResponse.json(
        { message: "Failed to fetch Steam data" },
        { status: steamResponse.status }
      );
    }

    const steamData = await steamResponse.json();
    const cs2Response = await fetch(
      `https://csbot-jvet.onrender.com/player-stats?steamid=${steamid}`
    );

    if (!cs2Response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch CS2 data" },
        { status: cs2Response.status }
      );
    }

    const cs2Data = await cs2Response.json();
    const steamLevelResponse = await fetch(
      `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${process.env.NEXT_PUBLIC_STEAM_API_KEY}&steamid=${steamid}`
    );
    if (!steamLevelResponse.ok) {
      console.error(`Steam Level API error: ${steamLevelResponse.statusText}`);
      return NextResponse.json(
        { message: "Failed to fetch Steam Level data" },
        { status: steamLevelResponse.status }
      );
    }
    const steamLevelData = await steamLevelResponse.json();

    return NextResponse.json(
      { steamData: steamData.response.players[0], steamLevel: steamLevelData.response.player_level, cs2Data: cs2Data || null },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
