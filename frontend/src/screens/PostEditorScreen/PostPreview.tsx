import { Button, makeStyles, Typography } from "@material-ui/core";
import React, { FC } from "react";

import { BoardHeader, Container, Post, PrimaryButton } from "src/components";
import { useBoardSelector, useTemplateSelector } from "src/redux/selectors";
import { Post as PostType } from "src/types";

interface Props {
  boardId: string;
  templateId: string;
  post: PostType;
  handleSave: () => void;
  exitPreview: () => void;
  saving: boolean;
}

export const PostPreview: FC<Props> = ({
  boardId,
  templateId,
  post,
  handleSave,
  exitPreview,
  saving,
}) => {
  const board = useBoardSelector(boardId);
  const template = useTemplateSelector(templateId);

  const styles = useStyles();

  if (!board || !template) {
    return null;
  }

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${template.background})` }}
    >
      <BoardHeader board={board} />
      <Container>
        <div className={styles.content}>
          <Post post={post} />
        </div>
      </Container>
      <div className={styles.actions}>
        <Typography align="center" gutterBottom>
          このあとは編集出来ません。こちらのメッセージでよろしいですか？
        </Typography>
        <PrimaryButton disabled={saving} onClick={handleSave}>
          メッセージを投稿する
        </PrimaryButton>
        <Button disabled={saving} onClick={exitPreview}>
          編集に戻る
        </Button>
      </div>
    </main>
  );
};

const useStyles = makeStyles({
  actions: {
    backgroundColor: "rgb(255, 255, 255, .6)",
    display: "grid",
    gap: 8,
    marginTop: 20,
    padding: "16px 40px",
  },
  main: {
    backgroundSize: "100%",
    backgroundRepeat: "repeat-y",
    flexGrow: 1,
    paddingBottom: 48,
  },
  content: {
    padding: 28,
  },
});
