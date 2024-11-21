import { DataHelper } from "./DataHelper";

export class QueryBuilder {
  public static getSelectRecordsScript = (tableName: string): string =>
    DataHelper.interpolateString(`SELECT * FROM {0}`, [tableName]);

  public static getSelectRecordsByIdScript = (
    tableName: string,
    idName: string,
    idValue: number
  ): string =>
    DataHelper.interpolateString(`SELECT * FROM {0} WHERE {1} = {2}`, [
      tableName,
      idName,
      idValue,
    ]);

  public static getSelectRecordsByValueScript = (
    tableName: string,
    fieldName: string,
    fieldValue: any
  ): string =>
    DataHelper.interpolateString(`SELECT * FROM {0} WHERE {1} = {2}`, [
      tableName,
      fieldName,
      this.getQueryStringValue(fieldValue),
    ]);

  public static getSelectLastRecordScript = (
    tableName: string,
    primaryIdName: string = "id"
  ): string =>
    DataHelper.interpolateString(
      `SELECT * FROM {0} ORDER BY {1} DESC LIMIT 1`,
      [tableName, primaryIdName]
    );

  public static getSelectRecordsUseRelatedTableScript = (
    tableName: string,
    relatedTableName: string,
    tableIdName: string,
    relatedTableIdName: string,
    relatedTableFilterIdName: string,
    relatedTableFilterIdValue: number,
    where?: Record<string, any>
  ): string => {
    const whereClause = where ? " and " + Object.entries(where)
      .filter(([key]) => typeof where[key] !== "object")
      .map(([key, value]) => `[${key}] = ${this.getQueryStringValue(value)}`)
      .join(" and ") : "";
    return DataHelper.interpolateString(
      `SELECT {0}.* FROM {0} INNER JOIN {1} ON {0}.{2} = {1}.{3} WHERE {1}.{4} = {5}${whereClause}`,
      [
        tableName,
        relatedTableName,
        tableIdName,
        relatedTableIdName,
        relatedTableFilterIdName,
        relatedTableFilterIdValue,
      ]
    );
  };

  public static getQueryStringValue = (value: any): string => {
    if (value === undefined) {
      return "NULL";
    } else if (typeof value === "boolean") {
      return value ? "1" : "0";
    } else if (typeof value === "string") {
      return `'${value.replace(/'/g, `''`)}'`;
    }
    return String(value);
  };

  public static constructInsertQuery = (
    tableName: string,
    data: Record<string, any>,
    idField: string = "id"
  ): string => {
    const columns = Object.keys(data)
      .filter((key) => key !== idField)
      .map((key) => `${key}`)
      .join(", ");

    const values = Object.entries(data)
      .filter(([key]) => key !== idField && typeof data[key] !== "object")
      .map(([, value]) => this.getQueryStringValue(value))
      .join(", ");

    return DataHelper.interpolateString(`INSERT INTO {0} ({1}) VALUES ({2})`, [
      tableName,
      columns,
      values,
    ]);
  };

  public static constructUpdateQuery = (
    tableName: string,
    data: Record<string, any>,
    idField: string = "id"
  ): string => {
    const setClause = Object.entries(data)
      .filter(([key]) => key !== idField && typeof data[key] !== "object")
      .map(([key, value]) => `[${key}] = ${this.getQueryStringValue(value)}`)
      .join(", ");

    const whereClause = `${idField} = ${this.getQueryStringValue(
      data[idField]
    )}`;

    return DataHelper.interpolateString(`UPDATE {0} SET {1} WHERE {2}`, [
      tableName,
      setClause,
      whereClause,
    ]);
  };

  public static getInsertOrUpdateRecordScript = (
    tableName: string,
    data: Record<string, any>,
    idField: string = "id"
  ): string =>
    !data[idField]
      ? this.constructInsertQuery(tableName, data, idField)
      : this.constructUpdateQuery(tableName, data, idField);

  public static getDeleteRecordScript = (
    tableName: string,
    data: Record<string, any>
  ): string => {
    const whereClause = Object.entries(data)
      .filter(([key]) => typeof data[key] !== "object")
      .map(([key, value]) => `[${key}] = ${this.getQueryStringValue(value)}`)
      .join(" and ");
    return DataHelper.interpolateString(`DELETE FROM {0} where {1}`, [
      tableName,
      whereClause,
    ]);
  };
}
