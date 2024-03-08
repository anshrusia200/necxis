import { NextResponse } from "next/server";
import { connect } from "@/config/db";
import Post from "../../../../models/Post";

export const GET = async (request: Request) => {
  try {
    await connect();
    const posts = await Post.find();
    console.log(posts);
    return new NextResponse(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    // console.log(error.message);
    return new NextResponse("Error in fetching posts " + error, {
      status: 500,
    });
  }
};
