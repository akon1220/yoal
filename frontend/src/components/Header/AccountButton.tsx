import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import React, { FC, useCallback, useRef, useState } from "react";

import { useAuthSelector } from "src/redux/selectors";
import { useAuthService } from "src/services";
import { PlainLink } from "../PlainLink";

export const AccountButton: FC = () => {
  const auth = useAuthSelector();
  const authService = useAuthService();
  const loggedIn = auth.isLoaded && !auth.isEmpty;

  const anchorEl = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpenMenu = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const handleLogOut = useCallback(() => {
    handleCloseMenu();
    authService.logOut();
  }, [authService, handleCloseMenu]);

  return (
    <>
      <IconButton onClick={handleOpenMenu} ref={anchorEl}>
        {loggedIn ? <AccountCircleIcon /> : <AccountCircleIcon />}
      </IconButton>
      <Menu
        anchorEl={anchorEl.current}
        keepMounted
        open={open}
        onClose={handleCloseMenu}
      >
        {loggedIn && (
          <PlainLink to="/profile">
            <MenuItem onClick={handleCloseMenu}>プロフィール</MenuItem>
          </PlainLink>
        )}
        {loggedIn && <MenuItem onClick={handleLogOut}>ログアウト</MenuItem>}
        {!loggedIn && (
          <PlainLink to="/login">
            <MenuItem onClick={handleCloseMenu}>ログイン</MenuItem>
          </PlainLink>
        )}
      </Menu>
    </>
  );
};
