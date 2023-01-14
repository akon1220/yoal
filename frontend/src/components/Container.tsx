import { makeStyles } from "@material-ui/core";
import React, { FC } from "react";

export const Container: FC = ({ children }) => {
  const styles = useStyles();

  return <div className={styles.container}>{children}</div>;
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "0 auto",
    maxWidth: 1200,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
  },
}));
