import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { FC, useCallback, useState } from "react";
import { Redirect, useParams } from "react-router-dom";

import {
  Container,
  Dropzone,
  PlainLink,
  PrimaryButton,
  PrimaryTextField,
} from "src/components";
import { useBoardSelector } from "src/redux/selectors";
import { usePostService, useStorageService } from "src/services";
import { Post } from "src/types";
import { getURL } from "src/utils";
import { PostPreview } from "./PostPreview";

interface Params {
  boardId: string;
}

export const PostEditorScreen: FC = () => {
  const { boardId } = useParams<Params>();

  const postService = usePostService();
  const storageService = useStorageService();
  const board = useBoardSelector(boardId);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [fromError, setFromError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [postId, setPostId] = useState("");

  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [avatarFile, setAvatarFile] = useState<File>();

  const handleFromChange = useCallback((e) => {
    setFrom(e.target.value);
    setFromError(false);
  }, []);
  const handleMessageChange = useCallback((e) => {
    setMessage(e.target.value);
    setMessageError(false);
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    const post: Post = { from, message, imageURL: "", avatarURL: "" };
    const { id: postId } = await postService.createPost(boardId, post);

    if (avatarFile || imageFile) {
      let imagePromise = Promise.resolve("");
      if (imageFile !== undefined) {
        imagePromise = storageService
          .uploadPostImage(imageFile, boardId, postId)
          .then((res) => storageService.getDownloadURL(res.metadata.fullPath));
      }
      let avatarPromise = Promise.resolve("");
      if (avatarFile !== undefined) {
        avatarPromise = storageService
          .uploadPostAvatar(avatarFile, boardId, postId)
          .then((res) => storageService.getDownloadURL(res.metadata.fullPath));
      }
      const [imageURL, avatarURL] = await Promise.all([
        imagePromise,
        avatarPromise,
      ]);
      const post: Post = { from, message, imageURL, avatarURL };
      await postService.updatePost(boardId, postId, post);
    }
    setPostId(postId);
  }, [
    from,
    message,
    imageFile,
    avatarFile,
    boardId,
    postService,
    storageService,
  ]);

  const exitPreview = useCallback(() => {
    setPreview(false);
  }, []);

  const showPreview = useCallback(() => {
    if (!Boolean(from && message)) {
      if (!from) setFromError(true);
      if (!message) setMessageError(true);
      return;
    }
    setPreview(true);
  }, [from, message]);

  const handleCancel = useCallback(() => {
    setDialogOpen(true);
  }, []);
  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const styles = useStyles();

  if (postId) {
    return <Redirect push to={`/board/${boardId}/edit`} />;
  }

  if (preview) {
    return (
      <PostPreview
        boardId={boardId}
        templateId={board?.template}
        post={{
          from,
          message,
          imageURL: getURL(imageFile),
          avatarURL: getURL(avatarFile),
        }}
        handleSave={handleSave}
        exitPreview={exitPreview}
        saving={saving}
      />
    );
  }

  return (
    <Container>
      <main className={styles.container}>
        <Typography className={styles.title} variant="h5">
          ???????????????
        </Typography>

        <Dropzone
          height={150}
          label="???????????????????????????????????????"
          onFileChange={setImageFile}
          value={imageFile}
        />

        <PrimaryTextField
          error={messageError}
          helperText={messageError ? "??????????????????????????????????????????" : ""}
          label="???????????????????????????"
          multiline
          rows={8}
          onChange={handleMessageChange}
          value={message}
        />

        <PrimaryTextField
          error={fromError}
          helperText={fromError ? "?????????????????????????????????" : ""}
          label="??????????????????????????????"
          onChange={handleFromChange}
          value={from}
        />

        <Dropzone
          height={100}
          label="?????????????????????????????????????????????????????????"
          onFileChange={setAvatarFile}
          value={avatarFile}
        />

        <PrimaryButton className={styles.previewButton} onClick={showPreview}>
          ???????????????
        </PrimaryButton>
        <Button onClick={handleCancel} style={{ borderRadius: 48 }}>
          ???????????????
        </Button>

        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            ?????????????????????????????????
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ?????????????????????????????????????????????
              ??????????????????????????????????????????????????????
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <PlainLink to={`/board/${boardId}/edit`}>
              <Button onClick={handleCloseDialog} color="primary">
                ??????
              </Button>
            </PlainLink>
            <Button onClick={handleCloseDialog} color="primary" autoFocus>
              ?????????
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </Container>
  );
};

const useStyles = makeStyles({
  avatar: {
    height: 100,
    width: 100,
  },
  avatarDropzone: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    color: "#bdbdbd",
    display: "flex",
    height: 100,
    justifyContent: "center",
  },
  avatarImageContainer: {
    backgroundColor: "#eee",
    borderRadius: 8,
    display: "flex",
    height: 100,
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  container: {
    display: "grid",
    gridGap: 16,
    padding: 16,
    paddingBottom: 100,
  },
  dropzone: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    color: "#bdbdbd",
    display: "flex",
    height: 150,
    justifyContent: "center",
  },
  fab: {
    right: 10,
    top: 10,
    position: "absolute",
  },
  image: {
    maxHeight: "100%",
    width: "100%",
    objectFit: "contain",
  },
  imageContainer: {
    backgroundColor: "#eee",
    borderRadius: 8,
    display: "flex",
    height: 150,
    position: "relative",
    width: "100%",
  },
  previewButton: {
    marginTop: 20,
  },
  title: {
    margin: "20px 0",
    textAlign: "center",
  },
});
