import {
  Avatar,
  Card,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { FC } from "react";

import { Post as PostType } from "src/types";

interface PostProps {
  post: PostType;
}

export const Post: FC<PostProps> = ({ post }) => {
  const { from, message, imageURL, avatarURL } = post;

  const styles = useStyles();
  return (
    <div className={styles.cardWrapper}>
      <Card elevation={4} className={styles.card}>
        {imageURL && <CardMedia className={styles.image} image={imageURL} />}

        <div className={styles.content}>
          <Typography variant="body2" color="textPrimary" component="p">
            {message}
          </Typography>
          <div className={styles.author}>
            <Typography variant="body2" color="textPrimary" component="p">
              {from}
            </Typography>
            {avatarURL && (
              <Avatar
                aria-label="recipe"
                className={styles.avatar}
                src={avatarURL}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

const useStyles = makeStyles({
  author: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  avatar: {
    height: 32,
    marginLeft: 16,
    width: 32,
  },
  card: {
    borderRadius: 8,
    position: "relative",
  },
  cardWrapper: {
    breakInside: "avoid",
    padding: 12,
    pageBreakInside: "avoid",
  },
  content: {
    padding: 16,
  },
  image: {
    paddingBottom: "100%",
  },
});
