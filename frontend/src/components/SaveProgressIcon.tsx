import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import { Check as CheckIcon } from "@material-ui/icons";
import React, { FC } from "react";

interface Props {
  saving: boolean;
}

export const SaveProgressIcon: FC<Props> = ({ saving }) => {
  const styles = useStyles();
  if (saving) {
    return (
      <div className={styles.container}>
        <Typography color="textSecondary" className={styles.text}>
          保存中…
        </Typography>
        <CircularProgress color="primary" size={10} />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <CheckIcon className={styles.icon} />
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    display: "flex",
    position: "absolute",
    right: 6,
    bottom: 3,
  },
  icon: {
    color: "yellowgreen",
    fontSize: 16,
  },
  text: {
    fontSize: 10,
    marginRight: 4,
  },
});
