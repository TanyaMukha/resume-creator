export const getQueryStringValue = (value: string | null | undefined) =>
  typeof value !== "string" ? "NULL" : value.length === 0 ? "NULL" : `"${value}"`;
