import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userSchema = z.object({
      email: z.string().email({ message: "Invalid email address" }),
      username: z.string().min(1, { message: "Username is required" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    });

    const { email, password, username } = userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email, username: username },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const {
      userId,
      email,
      username,
      password,
      riotId,
      regionalRoute,
      platformRoute,
      epicId,
      steamid,
    } = await request.json();
    if (!userId)
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    const existingUser = await db.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (riotId) {
      const existingRiotId = await db.user.findUnique({
        where: { riotId: riotId },
      });
      if (existingRiotId)
        return NextResponse.json(
          { message: "Riot ID already exists" },
          { status: 409 }
        );
    }
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        email: email || existingUser.email,
        username: username || existingUser.username,
        password: password ? await hash(password, 10) : existingUser.password,
        riotId: riotId || existingUser.riotId,
        epicId: epicId || existingUser.epicId,
        steamid: steamid || existingUser.steamid,
        regionalRoute: regionalRoute || existingUser.regionalRoute,
        platformRoute: platformRoute || existingUser.platformRoute,
      },
    });
    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
