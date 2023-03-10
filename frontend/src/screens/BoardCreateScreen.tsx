import { makeStyles, Typography } from "@material-ui/core";
import React, { FC, useCallback, useState } from "react";
import { Redirect, useParams } from "react-router";

import {
  Container,
  Dropzone,
  PrimaryButton,
  PrimaryTextField,
} from "src/components";
import { useAuthSelector } from "src/redux/selectors";
import { useBoardService, useStorageService } from "src/services";
import { Board } from "src/types";

interface Params {
  templateId: string;
}

export const BoardCreateScreen: FC = () => {
  const auth = useAuthSelector();
  const boardService = useBoardService();
  const storageService = useStorageService();
  const { templateId } = useParams<Params>();

  const [status, setStatus] = useState("idle");
  const [boardId, setBoardId] = useState("");

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File>();

  const [toError, setToError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleToChange = useCallback((e) => {
    setTo(e.target.value);
    setToError(false);
  }, []);
  const handleFromChange = useCallback((e) => {
    setFrom(e.target.value);
  }, []);
  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
    setTitleError(false);
  }, []);

  const createBoard = useCallback(async () => {
    if (!to || !title) {
      if (!to) setToError(true);
      if (!title) setTitleError(true);
      return;
    }

    setStatus("creating");
    try {
      const board: Board = {
        author: auth.uid,
        title,
        to,
        from,
        imageURL: "",
        template: templateId,
        isPublished: false,
      };
      const { id: boardId } = await boardService.createBoard(board);

      if (imageFile) {
        const imageURL = await storageService
          .uploadBoardImage(imageFile, boardId)
          .then((res) => storageService.getDownloadURL(res.metadata.fullPath));
        await boardService.updateImageURL(boardId, imageURL);
      }
      setBoardId(boardId);
      setStatus("created");
    } catch (e) {
      setStatus("idle");
    }
  }, [
    to,
    from,
    title,
    imageFile,
    auth,
    templateId,
    boardService,
    storageService,
  ]);

  const styles = useStyles();

  if (!auth.isLoaded) {
    return null;
  }

  if (auth.isEmpty) {
    return <Redirect to={`/login?template=${templateId}`} />;
  }

  if (status === "created") {
    return <Redirect push to={`/board/${boardId}/created`} />;
  }

  return (
    <Container>
      <main className={styles.container}>
        <Typography>?????????????????????????????????????????????????????????</Typography>

        <PrimaryTextField
          error={toError}
          helperText={toError ? "????????????????????????????????????????????????" : ""}
          label="?????????????????????????????????"
          onChange={handleToChange}
          value={to}
        />
        <PrimaryTextField
          error={titleError}
          helperText={toError ? "???????????????????????????????????????" : ""}
          label="???????????????????????????????????????"
          onChange={handleTitleChange}
          value={title}
        />
        <Dropzone
          label="???????????????????????????????????????"
          onFileChange={setImageFile}
        />
        <PrimaryTextField
          label="?????????????????????????????????"
          onChange={handleFromChange}
          value={from}
        />

        <PrimaryButton
          className={styles.button}
          disabled={status !== "idle"}
          onClick={createBoard}
        >
          ??????
        </PrimaryButton>
      </main>
    </Container>
  );
};

const useStyles = makeStyles({
  button: {
    marginTop: 16,
  },
  container: {
    display: "grid",
    gap: 16,
    padding: 16,
    paddingTop: 50,
  },
});
