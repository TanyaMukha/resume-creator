export const interpolateString = (template: string, values: any[]): string => {
  return template.replace(/{(\d+)}/g, (match, index) => {
    const value = values[index];
    if (typeof value === "boolean") {
      return value ? "1" : "0";
    }
    return value !== undefined ? String(value) : match;
  });
};
