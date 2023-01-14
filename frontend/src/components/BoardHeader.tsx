import { makeStyles, Typography } from "@material-ui/core";
import React, { FC } from "react";

import { Board } from "src/types";

interface Props {
  board: Board;
}

export const BoardHeader: FC<Props> = ({ board }) => {
  const { to, from, title, imageURL } = board;

  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <Typography align="center" className={styles.title} variant="h6">
          {title}
        </Typography>
        {to && (
          <Typography align="center" className={styles.name} variant="h5">
            {to}
          </Typography>
        )}
        {from && (
          <Typography align="center" className={styles.fromName} variant="h6">
            {`FROM ${from}`}
          </Typography>
        )}
      </div>

      {imageURL && (
        <div className={styles.imageSection}>
          <img className={styles.image} src={imageURL} alt="memory" />
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    backgroundColor: "rgba(255, 254, 253, 0.8);",
    padding: "20px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
  },
  image: {
    display: "block",
    borderRadius: 8,
    margin: "4px 0",
    maxWidth: "100%",
  },
  name: {
    color: "#213B3B",
  },
  fromName: {
    color: "#7F7F7F",
    fontFamily: "Averia Serif Libre",
    fontWeight: 700,
  },
  title: {
    color: "#D18C03",
    fontFamily: "seaweed-script-pro",
  },
  textSection: {
    flex: 1,
  },
  imageSection: {
    width: "40%",
  },
});
