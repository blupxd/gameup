import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      id,
      gameMode,
      language,
      microphone,
      rank,
      rankIcon,
      winRate,
      game,
      gameUsername,
      note,
    } = await req.json();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session && session.user.id !== id) {
      return NextResponse.json({ message: "Forbbiden" }, { status: 403 });
    }
    if (!gameMode || !game || !gameUsername || !language || !rank || !rankIcon || !winRate) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    //save
    const newPost = await db.post.create({
      data: {
        gameMode,
        microphone,
        language,
        gameUsername,
        game,
        rank,
        winRate,
        rankIcon,
        note,
        author: {
          connect: {
            id,
          },
        },
      },
    });
    return NextResponse.json(
      { user: newPost, message: "Post Created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.stack);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
            riotId: true,
            platformRoute: true,
            regionalRoute: true,
          },
        },
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
