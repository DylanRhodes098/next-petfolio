// app/api/users/route.ts
import { NextResponse } from "next/server";
import { User } from "@/backend/models";
import bcrypt from "bcrypt";
import { signToken,  } from "../lib/auth";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newUser = await User.create({
      name,
      email: email.trim().toLowerCase(),
      password
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.error("Error adding user:", err);
    return NextResponse.json({ error: "Error adding user" }, { status: 500 });
  }
}

// Define get route to login user //

// trigger try //

// Define desired data to be retrieved //

// Define if user not not found //

// Create error message //

// Define sequelize method to login user //

// Create response message 

// Trigger catch //

// Create error message //

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const user = await User.findOne({
      where: { email: String(email).trim().toLowerCase() },
    });

    const ok = user && await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json(
        { error: "Invalid email address or password." },
        { status: 401 }
      );
    }

    const token = await signToken(user);

    const res = NextResponse.json({ id: user.id }); // no token in body needed
    res.cookies.set("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1h
    });
    return res;
  
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Error logging in" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";