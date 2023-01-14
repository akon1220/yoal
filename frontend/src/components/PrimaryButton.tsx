import { Button, ButtonProps, makeStyles } from "@material-ui/core";
import React, { FC } from "react";

export const PrimaryButton: FC<ButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  const styles = useStyles();
  let classString = styles.button;
  if (className) classString += ` ${className}`;
  return (
    <Button
      {...rest}
      className={classString}
      color="primary"
      variant="contained"
    >
      {children}
    </Button>
  );
};

const useStyles = makeStyles({
  button: {
    borderRadius: 48,
    fontWeight: "bold",
  },
});
