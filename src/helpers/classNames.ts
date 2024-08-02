type Falsy = 0 | typeof NaN | false | null | undefined;
type ClassName = string | Falsy;

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/no-shadow
export const classNames = (...classNames: ClassName[]): string | undefined =>
  classNames.filter(Boolean).join(' ') || undefined;
