import { makeStyles, Typography } from "@material-ui/core";
import { CheckCircle as CheckIcon } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { Redirect, useLocation } from "react-router";

import { Container, PrimaryButton, PrimaryTextField } from "src/components";
import { useAuthSelector } from "src/redux/selectors";
import { useAuthService } from "src/services";
import { isValidEmail } from "src/utils";

export const LoginScreen = () => {
  const auth = useAuthSelector();
  const authService = useAuthService();

  const { search } = useLocation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [status, setStatus] = useState("waiting");

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    setEmailError(false);
  }, []);

  const handleLogIn = useCallback(() => {
    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }
    (async () => {
      setStatus("sending");
      await authService.logIn(email, search);
      setStatus("sent");
    })();
  }, [email, authService, search]);

  const styles = useStyles();

  if (!auth?.isLoaded) {
    return null;
  }

  if (!auth.isEmpty) {
    return <Redirect to="/profile" />;
  }

  if (status === "sent") {
    return (
      <main className={styles.confirmation}>
        <CheckIcon color="primary" className={styles.icon} />
        <Typography variant="h6">ログインメールを確認してください</Typography>
      </main>
    );
  }

  return (
    <Container>
      <main className={styles.loginWrapper}>
        <Typography variant="h6">ログイン</Typography>
        <PrimaryTextField
          autoComplete="email"
          disabled={status === "sending"}
          error={emailError}
          helperText={
            emailError ? "正しいメールアドレスを入力してください" : ""
          }
          label="メールアドレス"
          onChange={handleEmailChange}
          type="email"
          value={email}
        />

        <PrimaryButton disabled={status === "sending"} onClick={handleLogIn}>
          次へ
        </PrimaryButton>
      </main>
    </Container>
  );
};

const useStyles = makeStyles({
  confirmation: {
    display: "grid",
    justifyItems: "center",
    gap: 16,
    marginTop: 100,
    padding: 16,
  },
  icon: {
    fontSize: 64,
  },
  loginWrapper: {
    display: "grid",
    gap: 16,
    marginTop: 100,
    padding: 16,
  },
});
