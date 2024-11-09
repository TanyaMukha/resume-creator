export class DataHelper {
  public static getEnumKeyByValue<T extends Record<string, string>>(
    enumObj: T,
    value: string
  ): keyof T | undefined {
    return (Object.keys(enumObj) as Array<keyof T>).find(
      (key) => enumObj[key] === value
    );
  }

  public static interpolateString = (
    template: string,
    values: any[]
  ): string => {
    return template.replace(/{(\d+)}/g, (match, index) => {
      const value = values[index];
      if (typeof value === "boolean") {
        return value ? "1" : "0";
      }
      return value !== undefined ? String(value) : match;
    });
  };

  public static getUniqueElementsById<T extends { id: number }>(
    a: T[],
    b: T[]
  ): T[] {
    return a.filter((itemA) => !b.some((itemB) => itemA.id === itemB.id));
  }
}
