import { makeStyles, TextField, TextFieldProps } from "@material-ui/core";
import React, { FC } from "react";

export const PrimaryTextField: FC<TextFieldProps> = (props) => {
  const styles = useStyles();
  return (
    <TextField
      {...props}
      color="primary"
      fullWidth
      InputProps={{ className: styles.input }}
      variant="outlined"
    />
  );
};

const useStyles = makeStyles({
  input: {
    borderRadius: 8,
  },
});
