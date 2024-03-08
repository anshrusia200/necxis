import { NextResponse, NextRequest } from "next/server";
import connect from "../../../../db";
import Post from "../../../../models/Post";

export const POST = async (req: Request) => {
  try {
    await connect();
    console.log("got your request");
    const { url, description } = await req.json();
    const post = new Post({
      url: url,
      description: description,
    });
    await post.save();
    return new NextResponse(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error in fetching posts " + error, {
      status: 500,
    });
  }
};
