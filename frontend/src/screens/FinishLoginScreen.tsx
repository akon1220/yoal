import { CircularProgress, makeStyles } from "@material-ui/core";
import React, { FC, useEffect } from "react";
import { useFirebase } from "react-redux-firebase";
import { Redirect, useLocation } from "react-router";

import { useAuthSelector } from "src/redux/selectors";

export const FinishLoginScreen: FC = () => {
  const auth = useAuthSelector();
  const firebase = useFirebase();

  const { search } = useLocation();
  const templateId = search
    .slice(1)
    .split("&")
    .find((p) => p.startsWith("template="))
    ?.slice(9);

  useEffect(() => {
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email =
          window.prompt("Please provide your email for confirmation") || "";
      }
      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }, [firebase]);

  const styles = useStyles();

  if (auth.isLoaded && !auth.isEmpty) {
    if (templateId) {
      return <Redirect to={`/template/${templateId}`} />;
    }

    return <Redirect to="/profile" />;
  }

  return (
    <main className={styles.main}>
      <CircularProgress />
    </main>
  );
};

const useStyles = makeStyles({
  main: {
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
  },
});
