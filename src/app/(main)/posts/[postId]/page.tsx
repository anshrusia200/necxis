"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { socket } from "../../../../utils/socket";

const PostPage = () => {
  const params = useParams();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchPost = await axios.get(`/api/post/${params.postId}`);
        setPost(fetchPost.data);
        setLikeCount(() => {
          console.log("udpateing like from useeffetc");
          return fetchPost.data.likes;
        });
        setComments(fetchPost.data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    console.log("hi");
  }, []);
  const handleLikeClick = async () => {
    try {
      const count = like ? -1 : 1;
      socket.emit("likePost", params.postId, count);
      setLike(!like);
      const response = await axios.patch(`/api/post/${params.postId}/like`, {
        count: count,
      });
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment) {
      try {
        const postId = params.postId;
        const response = await axios.patch(
          `/api/post/${params.postId}/comment`,
          {
            comment: comment,
          }
        );
        const commentRes = response.data.comments[0];
        socket.emit("commentPost", postId, commentRes);
        setComment("");
        // setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket.on("updateLike", (postId: string, count: number) => {
      console.log(postId, count);
      if (params.postId == postId) {
        console.log("like from server");
        setLikeCount((likeCount) => {
          console.log("update like count to: ", likeCount + count);
          return likeCount + count;
        });
      }
    });

    return () => {
      socket.off("updateLike");
    };
  }, []);
  useEffect(() => {
    socket.on("updateComment", (postId: string, comment: any) => {
      console.log(postId, comment);
      if (params.postId == postId) {
        console.log("comment from server");
        setComments((comments) => {
          return [comment, ...comments];
        });
      }
    });

    return () => {
      socket.off("updateLike");
    };
  }, []);

  console.log("");
  return (
    <Grid container>
      {post ? (
        <>
          <Grid item xs={8} style={{ padding: "20px" }}>
            <img
              src={post.url}
              alt="Post"
              style={{ width: "80%", height: "auto" }}
            />
            <Typography variant="body1">{post.description}</Typography>
            {!like ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                }}
              >
                <FavoriteBorderIcon
                  onClick={handleLikeClick}
                  style={{
                    fontSize: 40,
                    cursor: "pointer",
                  }}
                />
                {likeCount}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                }}
              >
                <FavoriteIcon
                  onClick={handleLikeClick}
                  style={{
                    backgroundColor: "white",
                    color: "red",
                    fontSize: 40,
                    cursor: "pointer",
                  }}
                />
                {likeCount}
              </Box>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            style={{ padding: "20px", height: "80vh", overflowY: "auto" }}
          >
            {/* Comment Input */}
            <Box marginBottom="10px">
              <TextField
                label="Add Comment"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCommentSubmit}
                fullWidth
              >
                Submit
              </Button>
            </Box>
            <Typography
              sx={{
                fontSize: 25,
                textDecoration: "underline",
                marginBottom: 1,
              }}
            >
              Comments
            </Typography>

            <Box sx={{ height: "50vh", overflowY: "scroll", paddingBottom: 2 }}>
              {comments.length ? (
                comments?.map(({ comment, date, index }: any) => (
                  <Box key={index} border={1} padding={2} marginBottom={2}>
                    <Typography variant="body1">{comment}</Typography>

                    <Typography variant="caption">
                      {new Date(date).toLocaleString()}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography>No comments yet</Typography>
              )}
            </Box>
          </Grid>{" "}
        </>
      ) : (
        <>Loading</>
      )}
    </Grid>
  );
};

export default PostPage;
