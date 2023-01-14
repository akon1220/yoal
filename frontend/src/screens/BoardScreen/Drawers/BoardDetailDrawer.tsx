import React, { FC } from "react";
import { BoardDetail } from "./BoardDetail";
import { Board as BoardType } from "src/types";
import { Drawer, IconButton, makeStyles, Divider } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

interface Props {
  board: BoardType;
  boardId: string;
  isOpen: boolean;
  handleDrawerClose: () => void;
}

export const BoardDetailDrawer: FC<Props> = ({
  board,
  boardId,
  isOpen,
  handleDrawerClose,
}) => {
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

        <BoardDetail board={board} boardId={boardId} />
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
});
