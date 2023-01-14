import React, { FC } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
interface Props {
  isOpen: boolean;
  handleCloseModal: () => void;
}

export const PresentModal: FC<Props> = (props) => {
  const { handleCloseModal, isOpen } = props;

  const styles = useStyles();
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div>
        <IconButton onClick={handleCloseModal}>
          <CloseIcon />
        </IconButton>
        <DialogTitle classes={{ root: styles.title }}>
          本当にこの寄せ書きをプレゼントしますか？
        </DialogTitle>
      </div>
      <DialogContent>
        <DialogContentText>
          一度プレゼントしたら修正することはできません。プレビューは既に見ましたか？
        </DialogContentText>
      </DialogContent>
      <DialogActions classes={{ root: styles.wrapper }}>
        <div className={styles.buttonContainer}>
          <Button variant="contained" color="primary">
            プレゼントする
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles({
  buttonContainer: {
    display: "grid",
    gap: 8,
    padding: "8px 8px 30px 8px",
  },
  wrapper: {
    justifyContent: "center",
  },
  title: {
    padding: "0 17px",
  },
});
