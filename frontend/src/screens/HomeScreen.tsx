import { Card, CardMedia, makeStyles, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";

import banner_bg from "src/assets/banner_bg.png";
import { useAllTemplateSelector } from "src/redux/selectors";
import { Container } from "src/components";

export const HomeScreen: FC = () => {
  const templates = useAllTemplateSelector();

  const styles = useStyles();

  if (!templates) return null;

  return (
    <main>
      <section className={styles.banner}>
        <Container>
          <div className={styles.bannerContent}>
            <Typography variant="h4">Yoseal</Typography>
            <Typography variant="h6">
              想い伝わる。こだわりのオンライン寄せ書きアルバム🌸
            </Typography>
          </div>
        </Container>
      </section>
      <Container>
        <section className={styles.templateSection}>
          <Typography>全てのテンプレート</Typography>
          <div className={styles.templateGrid}>
            {templates.map(({ id, background, title }) => (
              <Card key={id} className={styles.template}>
                <Link to={`/template/${id}`}>
                  <CardMedia
                    className={styles.media}
                    image={background}
                    title={title}
                  />
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
};

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: `url(${banner_bg})`,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "25vh",
  },
  bannerContent: {
    padding: 16,
  },
  media: {
    paddingBottom: "100%",
  },
  templateSection: {
    padding: 16,
  },
  templateGrid: {
    display: "grid",
    gap: 8,
    gridTemplateColumns: "1fr 1fr 1fr",
    marginTop: 8,
  },
  template: {
    aspectRatio: "1/1",
    borderRadius: 8,
  },
}));
