import React, { FC, useState, useCallback } from "react";
import {
  ListItem,
  ListItemIcon,
  List,
  makeStyles,
  Divider,
  Typography,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { Board } from "src/types";
import { BoardDetailDrawer } from "./Drawers/BoardDetailDrawer";
import { BoardTemplateDrawer } from "./Drawers/BoardTemplateDrawer";
import { BoardInviteDrawer } from "./Drawers/BoardInviteDrawer";
import { PresentModal } from "src/components/PresentModal";

interface Props {
  board: Board;
  boardId: string;
  changeBackgroundImage: (newBackground: string, newId: string) => void;
  background: string;
}

export const BoardDrawerMenu: FC<Props> = (props) => {
  const { board, boardId, background, changeBackgroundImage } = props;
  const styles = useStyles();

  const [isOpenBoardDetailDrawer, setIsOpenBoardDetailDrawer] = useState(false);
  const [isOpenBoardTemplateDrawer, setIsOpenTemplateDrawer] = useState(false);
  const [isOpenBoardInviteDrawer, setIsOpenBoardInviteDrawer] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenBoardDetail = useCallback(() => {
    setIsOpenBoardDetailDrawer(true);
  }, []);

  const handleOpenBoardTemplateDrawer = useCallback(() => {
    setIsOpenTemplateDrawer(true);
  }, []);

  const handleOpenBoardInviteDrawer = useCallback(() => {
    setIsOpenBoardInviteDrawer(true);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handleCloseDetailDrawer = useCallback(() => {
    setIsOpenBoardDetailDrawer(false);
  }, []);

  const handleCloseTemplateDrawer = useCallback(() => {
    setIsOpenTemplateDrawer(false);
  }, []);

  const handleCloseInviteDrawer = useCallback(() => {
    setIsOpenBoardInviteDrawer(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <>
      <List component="div" disablePadding>
        <ListItem
          button
          onClick={handleOpenBoardDetail}
          classes={{ root: styles.section }}
        >
          <Typography variant="body2" className={styles.font}>
            ✏️ 基本情報を変更する
          </Typography>
          <ListItemIcon classes={{ root: styles.icon }}>
            <ChevronRightIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <BoardDetailDrawer
        board={board}
        boardId={boardId}
        isOpen={isOpenBoardDetailDrawer}
        handleDrawerClose={handleCloseDetailDrawer}
      />
      <Divider />

      <List component="div" disablePadding>
        <ListItem
          button
          classes={{ root: styles.section }}
          onClick={handleOpenBoardTemplateDrawer}
        >
          <Typography variant="body2" className={styles.font}>
            ✅ テンプレートを選ぶ
          </Typography>
          <ListItemIcon classes={{ root: styles.icon }}>
            <ChevronRightIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <BoardTemplateDrawer
        isOpen={isOpenBoardTemplateDrawer}
        handleDrawerClose={handleCloseTemplateDrawer}
        changeBackgroundImage={changeBackgroundImage}
        background={background}
      />
      <Divider />

      <List component="div" disablePadding>
        <ListItem
          button
          classes={{ root: styles.section }}
          onClick={handleOpenBoardInviteDrawer}
        >
          <Typography variant="body2" className={styles.font}>
            🙏 メッセージを依頼
          </Typography>
          <ListItemIcon classes={{ root: styles.icon }}>
            <ChevronRightIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <BoardInviteDrawer
        isOpen={isOpenBoardInviteDrawer}
        handleDrawerClose={handleCloseInviteDrawer}
      />
      <Divider />

      <List component="div" disablePadding>
        <ListItem button classes={{ root: styles.section }}>
          <Typography variant="body2" className={styles.font}>
            🔃 メッセージの順番
          </Typography>
          <ListItemIcon classes={{ root: styles.icon }}>
            <ChevronRightIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />

      <List component="div" disablePadding>
        <ListItem button classes={{ root: styles.section }}>
          <Typography variant="body2" className={styles.font}>
            👁 プレビューを見る
          </Typography>
          <ListItemIcon classes={{ root: styles.icon }}>
            <ChevronRightIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />

      <List component="div" disablePadding>
        <ListItem
          button
          classes={{ root: styles.section }}
          onClick={handleOpenModal}
        >
          <Typography variant="body2" className={styles.font}>
            🎁 寄せ書きをプレゼント
          </Typography>
          <ListItemIcon classes={{ root: styles.icon }}>
            <ChevronRightIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <PresentModal isOpen={isOpenModal} handleCloseModal={handleCloseModal} />
      <Divider />
    </>
  );
};

const useStyles = makeStyles({
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    justifyContent: "flex-end",
    minWidth: "5px",
  },
  font: {
    paddingRight: "3px",
  },
});
