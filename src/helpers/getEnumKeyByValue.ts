export function getEnumKeyByValue<T extends Record<string, string>>(enumObj: T, value: string): keyof T | undefined {
  return (Object.keys(enumObj) as Array<keyof T>).find(key => enumObj[key] === value);
}