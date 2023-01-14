import { makeStyles, Typography } from "@material-ui/core";
import React, { FC } from "react";

import { Container, PlainLink, PrimaryButton } from "src/components";

export const PageNotFound: FC = () => {
  const styles = useStyles();

  return (
    <Container>
      <main className={styles.pageNotFound}>
        <Typography variant="h5">
          指定されたページが見つかりませんでした
        </Typography>
        <p>
          ご指定いただいたアドレスが間違っているか、ページが移動または削除された可能性がございます。
        </p>
        <PlainLink to={"/"}>
          <PrimaryButton>トップへ戻る</PrimaryButton>
        </PlainLink>
      </main>
    </Container>
  );
};

const useStyles = makeStyles({
  pageNotFound: {
    padding: "16px",
    textAlign: "center",
  },
});
