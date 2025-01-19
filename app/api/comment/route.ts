import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust the import path to your db instance

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json(); // Always wrap in a try block
    const { userId, content, parentId } = body || {};

    if (!userId || !content) {
      return NextResponse.json(
        { message: "userId and content are required" },
        { status: 400 }
      );
    }
    console.log({
      authorId: session.user.id,
      userId: String(userId),
      content: String(content),
      parentId: parentId ?? "",
    });
    const newComment = await db.comment.create({
      data: {
        authorId: session.user.id,
        userId: String(userId),
        content: String(content),
        parentId: parentId ? String(parentId) : null,
      },
      include: {
        author: true
      }
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error: unknown) {
   
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  try {
    const comments = await db.comment.findMany({
      where: { userId: userId ?? undefined },
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
        },
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, content } = await req.json();
    const updatedComment = await db.comment.update({
      where: { id },
      data: { content },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();
    await db.comment.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
