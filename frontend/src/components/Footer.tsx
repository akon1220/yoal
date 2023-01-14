import { makeStyles } from "@material-ui/core";
import React, { FC } from "react";

export const Footer: FC = () => {
  const styles = useStyles();
  return (
    <footer className={styles.footer}>
      <p>Copyright Yoseal 2021 © All rights reserved</p>
    </footer>
  );
};

const useStyles = makeStyles({
  footer: {
    alignItems: "center",
    display: "flex",
    height: "10vh",
    margin: "auto",
  },
});
