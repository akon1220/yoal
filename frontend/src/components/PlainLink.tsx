import { makeStyles } from "@material-ui/core";
import { FC, forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";

export const PlainLink: FC<LinkProps> = forwardRef(
  ({ children, ...rest }, ref) => {
    const styles = useStyles();
    return (
      <Link {...rest} className={styles.link}>
        {children}
      </Link>
    );
  }
);

const useStyles = makeStyles({
  link: {
    color: "inherit",
    textDecoration: "none",
  },
});
