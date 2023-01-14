import { makeStyles, TextFieldProps } from "@material-ui/core";
import { debounce } from "lodash";
import React, { FC, useCallback, useState } from "react";

import { PrimaryTextField, SaveProgressIcon } from "src/components";

const debouncedSave = debounce(
  async (
    text: string,
    save: (text: string) => Promise<void>,
    setSaving: (saving: boolean) => void
  ) => {
    await save(text);
    setSaving(false);
  },
  1000
);

interface Props {
  save: (text: string) => Promise<void>;
}

export const AutoSaveTextField: FC<TextFieldProps & Props> = ({
  onChange,
  save,
  value,
  ...rest
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [saving, setSaving] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const text = e.target.value;
      setLocalValue(text);
      setSaving(true);
      debouncedSave(text, save, setSaving);
    },
    [save]
  );

  const styles = useStyles();
  return (
    <div className={styles.container}>
      <PrimaryTextField
        {...rest}
        onChange={handleChange}
        value={localValue}
      ></PrimaryTextField>
      <SaveProgressIcon saving={saving} />
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
