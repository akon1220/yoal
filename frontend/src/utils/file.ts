export const getURL = (value?: string | File) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value instanceof File) return URL.createObjectURL(value);
  return "";
};
