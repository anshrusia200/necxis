import { NextResponse, NextRequest } from "next/server";
import Post from "../../../../../../models/Post";

export const PATCH = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    console.log("got your request");
    if (!params.postId)
      return new NextResponse("Post ID Missing", { status: 400 });
    const post = await Post.findById(params.postId);
    if (!post) return new NextResponse("Post not found", { status: 404 });

    const { count } = await req.json();
    post.likes += count;
    await post.save();
    // console.log(post);
    return new NextResponse(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error in fetching posts " + error, {
      status: 500,
    });
  }
};