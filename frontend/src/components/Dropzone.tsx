import { Fab, makeStyles } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import React, { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { getURL } from "src/utils";

interface Props {
  height?: number;
  label: string;
  onFileChange: (file?: File) => void;
  value?: string | File;
}

export const Dropzone: FC<Props> = ({
  height = 150,
  label,
  onFileChange,
  value = "",
}) => {
  const imageURL = getURL(value);
  const [localImageURL, setImageURL] = useState(imageURL);

  const handleRemoveImage = useCallback(() => {
    setImageURL("");
    onFileChange();
  }, [onFileChange]);

  const {
    getRootProps: imageRootProps,
    getInputProps: imageInputProps,
  } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: ([file]) => {
      setImageURL(URL.createObjectURL(file));
      onFileChange(file);
    },
  });

  const styles = useStyles();

  if (imageURL || localImageURL) {
    return (
      <div className={styles.imageContainer} style={{ height }}>
        <img
          className={styles.image}
          src={imageURL || localImageURL}
          alt="upload"
        />
        <Fab
          aria-label="delete"
          color="primary"
          className={styles.fab}
          onClick={handleRemoveImage}
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </Fab>
      </div>
    );
  }

  return (
    <div {...imageRootProps({ className: styles.dropzone })} style={{ height }}>
      <input {...imageInputProps()} />
      <p>{label}</p>
    </div>
  );
};

const useStyles = makeStyles({
  dropzone: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    color: "#bdbdbd",
    display: "flex",
    justifyContent: "center",
  },
  fab: {
    right: 10,
    top: 10,
    position: "absolute",
  },
  image: {
    maxHeight: "100%",
    width: "100%",
    objectFit: "contain",
  },
  imageContainer: {
    backgroundColor: "#eee",
    borderRadius: 8,
    display: "flex",
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
});
