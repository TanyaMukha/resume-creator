import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { MigrationDto } from "../models/Dto";
import { databaseMigrations } from "../migrations";
import { getQueryStringValue } from "../../helpers/getQueryStringValue";

export class MigrationService {
  public static async createTable(): Promise<boolean> {
    const db = await SQLite.open(databaseOptions.db);
    const sql = (
      await import("../scripts/20240804_02_create_table_Skill.sql?raw")
    ).default;
    const res = await db.execute(sql);
    return res;
  }

  public static async getMigrations(): Promise<MigrationDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const migrations = await db.select<MigrationDto[]>(
      `SELECT Migration.name FROM Migration`
    );
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
          await db.execute(
            `INSERT INTO Migration (name) VALUES (${getQueryStringValue(
              databaseMigrations[i].name
            )})`
          );
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}
