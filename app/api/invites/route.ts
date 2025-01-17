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

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const {deleteAll, inviteId} = await req.json();
    if (deleteAll) {
      const deleteAllInvites = await db.invite.deleteMany({
        where: {
          userId: userId as string,
        },
      });
      return NextResponse.json(deleteAllInvites, { status: 200 });
    }
    const deleteInvite = await db.invite.deleteMany({
      where: {
        id: inviteId as string,
      },
    });
    return NextResponse.json(deleteInvite, { status: 200 });
  } catch (error: any) {
    console.log(error.stack);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { postId, senderId, accepted, inviteId } = await req.json();
  try {
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!postId || !senderId || accepted === undefined) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
    const userId = session.user.id;
    // Check if the invite exists

    const existingInvite = await db.invite.findFirst({
      where: { id: inviteId as string },
    });

    if (!existingInvite) {
      return NextResponse.json(
        { message: "Invite not found" },
        { status: 404 }
      );
    }
    const updatedInvite = await db.invite.update({
      data: {
        accepted: accepted as string,
      },
      where: { id: existingInvite.id },
    });
    const postInfo = await db.post.findUnique({
      where: { id: postId as string },
    });
    if (accepted === "accepted") {
      const sendAcceptedMessage = await db.invite.create({
        data: {
          accepted: "accepted",
          userId: senderId  as string,
          senderId: userId as string,
          message: `${session.user.username} accepted your invite to play ${postInfo?.game}.`,
        },
      });
      return NextResponse.json(
        { updatedInvite, sendAcceptedMessage },
        { status: 200 }
      );
    } else if(accepted === "rejected") {
      const sendRejectedMessage = await db.invite.create({
        data: {
          accepted: "rejected",
          userId: senderId as string,
          senderId: userId as string,
          message: `${session.user.username} rejected your invite to play ${postInfo?.game}.`,
        },
      });
      return NextResponse.json(
        { updatedInvite, sendRejectedMessage },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log(error.stack);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const { senderId, message, postId, userId } = await req.json();
  try {
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const authId = session.user.id;
    const existingInvite = await db.invite.findFirst({
      where: { postId: postId as string, senderId: senderId as string },
    });

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
        senderId: authId as string,
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
