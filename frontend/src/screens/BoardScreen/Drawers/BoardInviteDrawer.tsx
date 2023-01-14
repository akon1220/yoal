import React, { FC, useState } from "react";
import { useParams } from "react-router";
import {
  Drawer,
  IconButton,
  makeStyles,
  Divider,
  Typography,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { BoardCopy } from "src/components/BoardCopy";

interface Props {
  isOpen: boolean;
  handleDrawerClose: () => void;
}

interface Params {
  boardId: string;
}

export const BoardInviteDrawer: FC<Props> = (props) => {
  const { isOpen, handleDrawerClose } = props;
  const { boardId } = useParams<Params>();

  const styles = useStyles();

  return (
    <>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={handleDrawerClose}
        classes={{ paper: styles.drawer }}
      >
        <div className={styles.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={styles.container}>
          <Typography align="center" variant="caption">
            以下のURLを共有し、寄せ書きの参加者にメッセージの投稿を依頼しましょう。
          </Typography>
          <div className={styles.innerContainer}>
            <BoardCopy boardId={boardId} />
          </div>
        </div>
      </Drawer>
    </>
  );
};

const useStyles = makeStyles({
  drawer: {
    width: "65%",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  container: {
    padding: "40px 15px",
  },
  innerContainer: {
    padding: "20px 0",
    display: "grid",
    gap: 10,
  },
  copyButton: {
    justifySelf: "center",
  },
});
