import { NextResponse, NextRequest } from "next/server";
import Post from "../../../../../../models/Post";
import { connect } from "/db";

export const PATCH = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    await connect();
    console.log("got your request");
    if (!params.postId)
      return new NextResponse("Post ID Missing", { status: 400 });
    const post = await Post.findById(params.postId);
    if (!post) return new NextResponse("Post not found", { status: 404 });

    const { comment } = await req.json();
    console.log(comment);
    const newComment = {
      comment: comment,
    };
    post.comments.unshift(newComment);
    await post.save();
    console.log(post);
    return new NextResponse(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error in fetching posts " + error, {
      status: 500,
    });
  }
};
