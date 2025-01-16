import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const notifications = await db.invite.findMany({
      where: { userId: userId as string },
      orderBy: { createdAt: "desc" },
    });
    const sentInvites = await db.invite.findMany({
      where: { senderId: userId as string },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(
      {
        notifications,
        sentInvites,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.stack);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const { senderId, message, postId } = await req.json();
  try {
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const existingInvite = await db.invite.findFirst({
      where: { postId: postId as string, senderId: senderId as string },
    });
    console.log({ postId, existingInvite });
    if (existingInvite) {
      return NextResponse.json(
        { message: "Invite already sent for this game" },
        { status: 400 }
      );
    }
    const newInvite = await db.invite.create({
      data: {
        postId: postId as string,
        userId: userId as string,
        senderId: senderId as string,
        message: message as string,
      },
    });
    return NextResponse.json(newInvite, { status: 201 });
  } catch (error: any) {
    console.log(error.stack);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
