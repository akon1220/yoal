import {
  Avatar,
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { FC, useCallback, useState } from "react";
import { Redirect } from "react-router-dom";

import {
  Container,
  PlainLink,
  PrimaryButton,
  PrimaryTextField,
} from "src/components";
import {
  useAuthSelector,
  useOwnBoardsSelector,
  useTemplateSelector,
} from "src/redux/selectors";
import { useAuthService } from "src/services";

export const ProfileScreen: FC = () => {
  const auth = useAuthSelector();
  const authService = useAuthService();

  const [name, setName] = useState("");

  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleClick = useCallback(() => {
    (async () => {
      await authService.updateProfile({ displayName: name });
      window.location.reload();
    })();
  }, [authService, name]);

  const styles = useStyles();

  if (!auth?.isLoaded) {
    return null;
  }

  if (auth.isLoaded && auth.isEmpty) {
    return <Redirect to="/login" />;
  }

  if (!auth.displayName) {
    return (
      <main className={styles.profileWrapper}>
        <Typography className={styles.prompt} gutterBottom>
          名前を入力してアカウントの作成を完了する
        </Typography>
        <PrimaryTextField
          autoComplete="name"
          label="名前"
          onChange={handleNameChange}
        />
        <PrimaryButton fullWidth onClick={handleClick}>
          完了
        </PrimaryButton>
      </main>
    );
  }

  return (
    <Container>
      <main className={styles.profileWrapper}>
        <Avatar className={styles.avatar}></Avatar>
        <Typography variant="h4">{auth.displayName}</Typography>
        <Typography variant="h5" className={styles.title}>
          Boards
        </Typography>
        <Boards userId={auth.uid} />
      </main>
    </Container>
  );
};

interface BoardProps {
  userId: string;
}

const Boards: FC<BoardProps> = ({ userId }) => {
  const boards = useOwnBoardsSelector(userId);

  const styles = useStyles();

  if (!boards) {
    return null;
  }

  return (
    <>
      {boards.map(({ id, template, title, posts }) => {
        const attr = `${posts ? Object.keys(posts).length : 0} published posts`;
        return (
          <Card key={id} className={styles.card}>
            <PlainLink to={`/board/${id}/edit`}>
              <CardActionArea>
                <div className={styles.cardContent}>
                  <BoardMedia templateId={template} />
                  <div className={styles.cardDetails}>
                    <Typography variant="body1">{title}</Typography>
                    <Typography variant="body2">{attr}</Typography>
                  </div>
                </div>
              </CardActionArea>
            </PlainLink>
          </Card>
        );
      })}
    </>
  );
};

interface BoardMediaProps {
  templateId: string;
}

const BoardMedia: FC<BoardMediaProps> = ({ templateId }) => {
  const template = useTemplateSelector(templateId);

  const styles = useStyles();

  if (!template) {
    return null;
  }

  return <CardMedia image={template.background} className={styles.cardMedia} />;
};

const useStyles = makeStyles({
  avatar: {
    height: 100,
    marginTop: 24,
    width: 100,
  },
  card: {
    width: "100%",
  },
  cardContent: {
    display: "flex",
  },
  cardDetails: {
    padding: 8,
    width: "70%",
  },
  cardMedia: {
    paddingBottom: "25%",
    width: "30%",
  },
  profileWrapper: {
    alignItems: "center",
    display: "grid",
    justifyItems: "center",
    gap: 16,
    padding: 16,
  },
  prompt: {
    marginTop: 24,
    width: "100%",
  },
  title: {
    justifySelf: "start",
    marginTop: 24,
  },
});
