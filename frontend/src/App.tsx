import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Footer, Header } from "src/components";
import {
  BoardCreateScreen,
  BoardCreatedScreen,
  BoardScreen,
  FinishLoginScreen,
  HomeScreen,
  LoginScreen,
  PageNotFound,
  PostEditorScreen,
  ProfileScreen,
  TemplateScreen,
} from "src/screens";
import { YELLOW } from "./styles/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: YELLOW,
    },
  },
});

export const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Header />
          <HomeScreen />
          <Footer />
        </Route>
        <Route path="/login" exact>
          <Header />
          <LoginScreen />
        </Route>
        <Route path="/finish-login" exact>
          <Header />
          <FinishLoginScreen />
        </Route>
        <Route path="/profile" exact>
          <Header />
          <ProfileScreen />
        </Route>
        <Route path="/template/:templateId" exact>
          <Header />
          <TemplateScreen />
        </Route>
        <Route path="/template/:templateId/create" exact>
          <Header />
          <BoardCreateScreen />
        </Route>
        <Route path="/board/:boardId/edit" exact>
          <BoardScreen />
        </Route>
        <Route path="/board/:boardId" exact>
          {/* temporary */}
          <BoardScreen />
        </Route>
        <Route path="/board/:boardId/created" exact>
          <Header />
          <BoardCreatedScreen />
        </Route>
        <Route path="/board/:boardId/create-post" exact>
          <Header />
          <PostEditorScreen />
        </Route>
        <Route>
          <Header />
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);
