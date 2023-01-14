import React, { useRef, useState, useCallback } from "react";
import { Button, makeStyles, Popover, Typography } from "@material-ui/core";
import { PrimaryTextField } from "./index";
import { DOMAIN } from "src/constants";

interface Props {
  boardId: string;
}

export const BoardCopy: React.FC<Props> = ({ boardId }) => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const copyLink = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
    inputRef.current?.select();
    document.execCommand("copy");
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <PrimaryTextField
        inputRef={inputRef}
        value={`${DOMAIN}/board/${boardId}/edit`}
      />
      <Button className={styles.copyButton} onClick={copyLink}>
        コピーする
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={styles.popoverContainer}>
          <Typography>コピーしました。</Typography>
        </div>
      </Popover>
    </>
  );
};

const useStyles = makeStyles({
  button: {
    marginTop: 20,
  },
  copyButton: {
    justifySelf: "center",
  },
  popoverContainer: {
    padding: "10px",
  },
});
