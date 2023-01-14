import { makeStyles, Typography } from "@material-ui/core";
import React, { FC, useCallback } from "react";
import { Dropzone } from "src/components";

import { useBoardService, useStorageService } from "src/services";
import { Board } from "src/types";
import { AutoSaveTextField } from "../AutoSaveTextField";

interface Props {
  board: Board;
  boardId: string;
}

export const BoardDetail: FC<Props> = ({ board, boardId }) => {
  const boardService = useBoardService();
  const storageService = useStorageService();

  const handleFileChange = useCallback(
    (file?: File) => {
      (async () => {
        let imageURL = "";
        if (file) {
          imageURL = await storageService
            .uploadBoardImage(file, boardId)
            .then((res) =>
              storageService.getDownloadURL(res.metadata.fullPath)
            );
        }
        await boardService.updateImageURL(boardId, imageURL);
      })();
    },
    [boardId, boardService, storageService]
  );

  const styles = useStyles();
  return (
    <div className={styles.menu}>
      <Typography>詳細</Typography>
      <AutoSaveTextField
        label="送る相手の名前"
        save={(text: string) => boardService.updateTo(boardId, text)}
        value={board.to}
      />
      <AutoSaveTextField
        label="タイトル"
        save={(text: string) => boardService.updateTitle(boardId, text)}
        value={board.title}
      />
      <AutoSaveTextField
        label="グループの名前"
        save={(text: string) => boardService.updateFrom(boardId, text)}
        value={board.from}
      />
      <Dropzone
        label="思い出の写真を選択"
        onFileChange={handleFileChange}
        value={board.imageURL}
      />
    </div>
  );
};

const useStyles = makeStyles({
  menu: {
    display: "grid",
    gap: 16,
    padding: "24px 16px",
  },
  textFieldContainer: {
    position: "relative",
  },
});
