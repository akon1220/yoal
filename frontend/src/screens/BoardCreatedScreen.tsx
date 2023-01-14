import { makeStyles, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { useParams } from "react-router";

import { Container, PlainLink, PrimaryButton } from "src/components";
import { BoardCopy } from "src/components/BoardCopy";

interface Params {
  boardId: string;
}

export const BoardCreatedScreen: FC = () => {
  const { boardId } = useParams<Params>();

  const styles = useStyles();
  return (
    <Container>
      <main className={styles.main}>
        <Typography>
          以下のURLを共有し、寄せ書きの参加者にメッセージの投稿を依頼しましょう。
        </Typography>
        <BoardCopy boardId={boardId} />
        <PlainLink to={`/board/${boardId}/edit`}>
          <PrimaryButton className={styles.button} fullWidth>
            寄せ書きの編集を始める
          </PrimaryButton>
        </PlainLink>
      </main>
    </Container>
  );
};

const useStyles = makeStyles({
  button: {
    marginTop: 20,
  },
  main: {
    display: "grid",
    gap: 16,
    padding: 16,
    paddingTop: 100,
  },
});
