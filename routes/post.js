// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { Post, User } from "@/lib/models"; // adjust to where your Sequelize models live
// If you had auth, you'd import/verify here, e.g. import { verifyJWT } from "@/lib/auth";

export async function GET(req) {
  try {
    // (Optional) auth example if you need it:
    // const auth = request.headers.get("authorization"); 
    // if (!auth) return NextResponse.json({ error: "No token" }, { status: 401 });
    // const token = auth.split(" ").pop()?.trim();
    // await verifyJWT(token); // throw on invalid
    const posts = await Post.findAll({
      include: {
        model: User,
        as: "author",
        attributes: ["id", "avatar", "name"],
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return NextResponse.json({ error: "Error retrieving posts" }, { status: 500 });
  }
}

// Define post route to create a post //

// trigger try //

// Define desired data //

// Create if data not found //

// Create error message //

// Define sequelize method to create a post //

// Create response message //

// Trigger catch //

// Create error message 

export async function POST(req) {
  try {
    const { }
  }

}

// Optional: ensure this route is always dynamic (no caching)
export const dynamic = "force-dynamic";
// or: export const revalidate = 0;

