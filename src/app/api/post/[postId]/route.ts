import { NextResponse, NextRequest } from "next/server";
import { connect } from "/db";
import Post from "../../../../../models/Post";

export const GET = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    await connect();
    console.log("got your request");
    const postId = params.postId;
    const post = await Post.findById(postId);

    return new NextResponse(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error in fetching posts " + error, {
      status: 500,
    });
  }
};
