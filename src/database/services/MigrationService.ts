import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { MigrationDto } from "../models/Dto";
import { databaseMigrations } from "../migrations/migrations";
import { getQueryStringValue } from "../helpers/getScript";
import { interpolateString } from "../helpers/interpolateString";

export class MigrationService {
  private static createTableQuery = () => `
    CREATE TABLE Migration (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      executed TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;
  private static selectQuery = () => `SELECT name FROM Migration`;
  private static insertQuery = (name: string, description: string = "") =>
    interpolateString(
      `INSERT INTO Migration (name, description) VALUES ({0}, {1})`,
      [getQueryStringValue(name), getQueryStringValue(description)]
    );

  public static async createTable(): Promise<boolean> {
    const db = await SQLite.open(databaseOptions.db);
    const res = await db.execute(this.createTableQuery());
    return res;
  }

  public static async getMigrations(): Promise<MigrationDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const migrations = await db.select<MigrationDto[]>(this.selectQuery());
    return migrations;
  }

  public static async checkUpdatingDatabase(): Promise<void> {
    const db = await SQLite.open(databaseOptions.db);
    let migrations: MigrationDto[] = [];
    try {
      migrations = await this.getMigrations();
    } catch (e) {
      console.error(e);
      await this.createTable();
    }
    for (let i = 0; i < databaseMigrations.length; i++) {
      if (
        !migrations.find((item) => item.name === databaseMigrations[i].name)
      ) {
        await db.execute(databaseMigrations[i].sql);
        try {
          await db.execute(this.insertQuery(databaseMigrations[i].name, databaseMigrations[i].description));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}
