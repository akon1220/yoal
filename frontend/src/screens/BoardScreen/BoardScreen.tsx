import { Drawer, IconButton, makeStyles, Typography } from "@material-ui/core";
import { MoreHoriz as MoreHorizIcon } from "@material-ui/icons";
import React, { FC, useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import {
  BoardHeader,
  Container,
  Header,
  PlainLink,
  Post,
  PrimaryButton,
} from "src/components";
import {
  useAuthSelector,
  useBoardSelector,
  useTemplateSelector,
} from "src/redux/selectors";
import { Board as BoardType, Post as PostType } from "src/types";
import { BoardDrawerMenu } from "./BoardDrawerMenu";
import { useBoardService } from "src/services/firestore/boardService";

interface Params {
  boardId: string;
}

export const BoardScreen: FC = () => {
  const { boardId } = useParams<Params>();
  const board = useBoardSelector(boardId);

  if (!board) {
    return null;
  }

  return <BoardScreenInner boardId={boardId} board={board} />;
};

interface BoardScreenInnerProps {
  boardId: string;
  board: BoardType;
}

const BoardScreenInner: FC<BoardScreenInnerProps> = ({ boardId, board }) => {
  const auth = useAuthSelector();
  const boardService = useBoardService();
  const template = useTemplateSelector(board?.template);
  const isAuthor = auth?.uid === board?.author;

  const [menuOpen, setMenuOpen] = useState(false);
  const [background, setBackground] = useState("");

  const changeBackgroundImage = useCallback(
    (newBackground: string, template: string) => {
      setBackground(newBackground);
      boardService.updateBackgroundImage(template, boardId);
    },
    []
  );

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const styles = useStyles();

  if (!board) {
    return null;
  }

  const posts: { id: string; post: PostType }[] = [];
  if (board.posts) {
    Object.keys(board.posts).forEach((id) => {
      const post = board.posts?.[id];
      if (post) {
        posts.push({ id, post });
      }
    });
  }

  return (
    <>
      {!board.isPublished && <Header />}
      <main
        style={{ backgroundImage: `url(${template?.background})` }}
        className={styles.main}
      >
        {!board.isPublished && (
          <>
            <div className={styles.headerWrapper}>
              <Container>
                <div className={styles.header}>
                  <div>
                    {isAuthor && (
                      <IconButton onClick={toggleMenu}>
                        <MoreHorizIcon />
                      </IconButton>
                    )}
                  </div>
                  <PlainLink to={`/board/${boardId}/create-post`}>
                    <PrimaryButton>+メッセージ</PrimaryButton>
                  </PlainLink>
                </div>
              </Container>
            </div>
            <div className={styles.headerSpacer} />
          </>
        )}

        <BoardHeader board={board} />

        <div className={styles.posts}>
          {posts.map(({ id, post }) => (
            <Post post={post} key={id} />
          ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <Typography variant="body2" color="textSecondary">
              Made with Yoseal
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {"Create your own at "}
              <a href="https://yoseal.co" className={styles.footerLink}>
                yoseal.co
              </a>
            </Typography>
          </div>
        </div>

        <Drawer
          classes={{ paper: styles.drawer }}
          open={menuOpen}
          onClose={closeMenu}
        >
          <BoardDrawerMenu
            board={board}
            boardId={boardId}
            changeBackgroundImage={changeBackgroundImage}
            background={background}
          />
        </Drawer>
      </main>
    </>
  );
};

const useStyles = makeStyles({
  drawer: {
    width: "65%",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  footerContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: 150,
    justifyContent: "center",
  },
  footerLink: {
    color: "black",
  },
  header: {
    alignItems: "center",
    display: "flex",
    height: 60,
    justifyContent: "space-between",
  },
  headerSpacer: {
    height: 60,
  },
  headerWrapper: {
    backgroundColor: "rgb(255, 255, 255, 0.9)",
    left: 0,
    position: "fixed",
    padding: "0 16px 0 8px",
    top: 50,
    width: "100%",
    zIndex: 50,
  },
  main: {
    backgroundSize: "100%",
    backgroundRepeat: "repeat-y",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  posts: {
    columnCount: "auto",
    columnWidth: 300,
    columnGap: 0,
    padding: 28,
  },
  url: {
    flexGrow: 1,
  },
});
