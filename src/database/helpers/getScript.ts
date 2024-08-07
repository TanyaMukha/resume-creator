import { interpolateString } from "./interpolateString";

export const getSelectRecordsByIdScript = (
  tableName: string,
  idName: string,
  idValue: number
): string =>
  interpolateString(`SELECT * FROM {0} WHERE {1} = {2}`, [
    tableName,
    idName,
    idValue,
  ]);

export const getSelectLastRecordScript = (
  tableName: string,
  primaryIdName: string = "id"
): string =>
  interpolateString(`SELECT * FROM {0} ORDER BY {1} DESC LIMIT 1`, [
    tableName,
    primaryIdName,
  ]);

export const getSelectRecordsUseRelatedTableScript = (
  tableName: string,
  relatedTableName: string,
  tableIdName: string,
  relatedTableIdName: string,
  relatedTableFilterIdName: string,
  relatedTableFilterIdValue: number
): string =>
  interpolateString(
    `SELECT {0}.* FROM {0} INNER JOIN {1} ON {0}.{2} = {1}.{3} WHERE {1}.{4} = {5}`,
    [
      tableName,
      relatedTableName,
      tableIdName,
      relatedTableIdName,
      relatedTableFilterIdName,
      relatedTableFilterIdValue,
    ]
  );

export const getQueryStringValue = (value: any): string => {
  if (value === undefined) {
    return "NULL";
  } else if (typeof value === "boolean") {
    return value ? "1" : "0";
  } else if (typeof value === "string") {
    return `'${value}'`;
  }
  return String(value);
};

const constructInsertQuery = (
  tableName: string,
  data: Record<string, any>,
  idField: string = "id"
): string => {
  const columns = Object.keys(data)
    .filter((key) => key !== idField)
    .join(", ");

  const values = Object.entries(data)
    .filter(([key]) => key !== idField)
    .map(([, value]) => getQueryStringValue(value))
    .join(", ");

  return interpolateString(`INSERT INTO {0} ({1}) VALUES ({2})`, [
    tableName,
    columns,
    values,
  ]);
};

const constructUpdateQuery = (
  tableName: string,
  data: Record<string, any>,
  idField: string = "id"
): string => {
  const setClause = Object.entries(data)
    .filter(([key]) => key !== idField)
    .map(([key, value]) => `${key} = ${getQueryStringValue(value)}`)
    .join(", ");

  const whereClause = `${idField} = ${getQueryStringValue(data[idField])}`;

  return interpolateString(`UPDATE {0} SET {1} WHERE {2}`, [
    tableName,
    setClause,
    whereClause,
  ]);
};

export const getInsertOrUpdateRecordScript = (
  tableName: string,
  data: Record<string, any>,
  idField: string = "id"
): string =>
  data[idField]
    ? constructInsertQuery(tableName, data, idField)
    : constructUpdateQuery(tableName, data, idField);
