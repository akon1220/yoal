import {
  Drawer,
  IconButton,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import React, { useCallback, useState } from "react";

import { AccountButton } from "./AccountButton";
import { Container } from "../Container";
import { PlainLink } from "../PlainLink";

export const Header = () => {
  const styles = useStyles();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={styles.headerContent}>
            <IconButton onClick={toggleMenu}>
              <MenuIcon />
            </IconButton>
            <AccountButton />
          </div>
        </Container>

        <Drawer
          classes={{ paper: styles.drawer }}
          open={menuOpen}
          onClose={closeMenu}
        >
          <List>
            <PlainLink to="/">
              <ListItem button onClick={closeMenu}>
                ホーム
              </ListItem>
            </PlainLink>
          </List>
        </Drawer>
      </header>
      <div className={styles.spacer} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
  },
  header: {
    backgroundColor: "#E8F2FA",
    left: 0,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 100,
  },
  headerContent: {
    alignItems: "center",
    display: "flex",
    height: 50,
    justifyContent: "space-between",
  },
  spacer: {
    height: 50,
  },
}));
