import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { FavoriteBorder, ChatBubbleOutline } from "@mui/icons-material";

export default function Post({ post }: any) {
  return (
    <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={post.url}
          alt="green iguana"
        />

        {post.description ? (
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
          </CardContent>
        ) : (
          ""
        )}
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">
            <FavoriteBorder style={{ color: "red" }} /> {post.likes}
          </Typography>
          <Typography variant="body2">
            <ChatBubbleOutline style={{ color: "blue" }} />{" "}
            {post.comments.length}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
