"use client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Post from "../../../components/post/post";
import { UploadButton } from "../../../utils/uploadthing";
import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { socket } from "@/utils/socket";

export default function PostsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await axios.get("/api/posts");
      setPosts(fetchedPosts.data);
    } catch (error) {
      console.log("Cannnot feetch posts");
    }
  };
  useEffect(() => {
    socket.on("updateLike", (postId: string, count: number) => {
      console.log("heheh");
      setPosts((prevPosts: any) =>
        prevPosts.map((post: any) =>
          post._id === postId ? { ...post, likes: post.likes + count } : post
        )
      );
    });

    return () => {
      socket.off("updateLike");
    };
  }, []);
  useEffect(() => {
    socket.on("updateComment", (postId: string, comment: any) => {
      console.log("heheh2");
      setPosts((prevPosts: any) =>
        prevPosts.map((post: any) =>
          post._id === postId
            ? { ...post, comments: [comment, ...post.comments] }
            : post
        )
      );
    });

    return () => {
      socket.off("updateLike");
    };
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async () => {
    if (url) {
      try {
        const post = {
          url: url,
          description: description,
        };
        await axios.post("/api/post", post);

        setDescription("");
        setUrl("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOpenPost = (post: any) => {
    router.push(`/posts/${post._id}`);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
          {url !== "" ? (
            <img src={url} alt="" style={{ width: "100%", height: "100%" }} />
          ) : (
            <></>
          )}
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box marginTop="20px">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                // console.log(res[0]);
                setUrl(res[0].url);
                // console.log(res[0].url);
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={url ? false : true}
            >
              Submit Post
            </Button>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={6} sx={{ marginTop: 3 }}>
        <Grid
          container
          spacing={3}
          sx={{ height: "80vh", overflowY: "scroll", paddingBottom: 2 }}
        >
          {loading ? (
            posts.map((post: any) => (
              <Grid
                item
                xs={12}
                key={post._id}
                onClick={() => handleOpenPost(post)}
              >
                <Post post={post} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <span>Loading posts</span>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
