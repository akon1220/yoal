import React, { FC, useState } from "react";
import { Drawer, IconButton, makeStyles, Divider } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { BoardTemplates } from "./BoardTemplates";
import { useAllTemplateSelector } from "src/redux/selectors";

interface Props {
  isOpen: boolean;
  handleDrawerClose: () => void;
  changeBackgroundImage: (newBackground: string, newId: string) => void;
  background: string;
}

export const BoardTemplateDrawer: FC<Props> = (props) => {
  const { isOpen, handleDrawerClose, changeBackgroundImage, background } =
    props;
  const templates = useAllTemplateSelector();

  const styles = useStyles();

  return (
    <>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={handleDrawerClose}
        classes={{ paper: styles.drawer }}
      >
        <div className={styles.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <BoardTemplates
          background={background}
          changeBackgroundImage={changeBackgroundImage}
          templates={templates}
        />
      </Drawer>
    </>
  );
};

const useStyles = makeStyles({
  drawer: {
    width: "65%",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
