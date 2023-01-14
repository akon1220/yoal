import { Card, CardMedia, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

import { Container, PlainLink, PrimaryButton } from "src/components";
import { useAuthSelector, useTemplateSelector } from "src/redux/selectors";

interface Params {
  templateId: string;
}

export const TemplateScreen = () => {
  const auth = useAuthSelector();
  const { templateId } = useParams<Params>();
  const signedIn = auth.isLoaded && !auth.isEmpty;

  const template = useTemplateSelector(templateId);

  const styles = useStyles();

  if (!template) {
    return null;
  }

  const { background, description, title } = template;
  const buttonLink = signedIn
    ? `/template/${templateId}/create`
    : `/login?template=${templateId}`;
  return (
    <Container>
      <main className={styles.info}>
        <Card elevation={3} className={styles.heroImage}>
          <CardMedia
            className={styles.media}
            image={background}
            title={title}
          />
        </Card>

        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">{description}</Typography>

        <PlainLink to={buttonLink}>
          <PrimaryButton fullWidth>
            このテンプレートで寄せ書きを作る
          </PrimaryButton>
        </PlainLink>
      </main>
    </Container>
  );
};

const useStyles = makeStyles({
  heroImage: {
    borderRadius: 8,
    height: 250,
    margin: "32px 0",
    objectFit: "cover",
    width: "100%",
  },
  info: {
    display: "grid",
    gap: 16,
    padding: 16,
  },
  media: {
    paddingBottom: "100%",
  },
});
