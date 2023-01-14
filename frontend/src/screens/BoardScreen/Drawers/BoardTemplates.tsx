import React, { useCallback } from "react";
import { Card, CardMedia, CardActionArea, makeStyles } from "@material-ui/core";

interface Props {
  changeBackgroundImage: (newBackground: string, newId: string) => void;
  background: string;
  templates: any[];
}

export const BoardTemplates: React.FC<Props> = (props) => {
  const { background, changeBackgroundImage, templates } = props;

  if (!templates) return null;

  const styles = useStyles();

  const handleChangeBackground = useCallback(
    (newBackground: string, newId: string) => {
      changeBackgroundImage(newBackground, newId);
    },
    []
  );

  const isSelected = (cardBackground: string) => {
    let cardStyle = styles.template;
    if (background === cardBackground)
      cardStyle += ` ${styles.selectedTemplate}`;
    return cardStyle;
  };

  return (
    <div className={styles.templateGrid}>
      {templates.map(({ id, background, title }) => (
        <Card
          key={id}
          className={isSelected(background)}
          onClick={() => handleChangeBackground(background, id)}
        >
          <CardActionArea>
            <CardMedia src={background} component="img" />
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

const useStyles = makeStyles({
  templateGrid: {
    display: "grid",
    gap: 8,
    gridTemplateColumns: "1fr 1fr",
    margin: 8,
  },
  template: {
    aspectRatio: "1/1",
    borderRadius: 8,
  },
  selectedTemplate: {
    boxShadow:
      "0 3px 6px rgb(67 166 231 / 75%), 0 3px 6px rgb(67 166 231 / 75%)",
  },
});
