import {
  fetchGameIds,
  fetchMultipleGameDetails,
  fetchProfileData,
  fetchPuuid,
  fetchRankedData,
} from "@/data/fetchLeagueData";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const puuid = searchParams.get("puuid");
  const regionalRoute = searchParams.get("regionalRoute");
  try {
    if (!puuid || !regionalRoute)
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 401 }
      );
    const gameIds = await fetchGameIds(
      regionalRoute as string,
      puuid as string
    );
    const matchHistory = await fetchMultipleGameDetails(
      regionalRoute as string,
      gameIds
    );
    return NextResponse.json({ matchHistory }, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { riotId, platformRoute, regionalRoute } = body;
    if (!riotId || !regionalRoute || !platformRoute) {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 401 }
      );
    }
    const puuid = await fetchPuuid(riotId as string, regionalRoute as string);
    const profileData = await fetchProfileData(puuid, platformRoute as string);
    const rankedData = await fetchRankedData(
      profileData.id as string,
      platformRoute as string
    );

    return NextResponse.json(
      { data: profileData, rankedData },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
