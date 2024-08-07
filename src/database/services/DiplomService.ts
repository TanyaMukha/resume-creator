import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { DiplomDto } from "../models/Dto";
import {
  getInsertOrUpdateRecordScript,
  getSelectLastRecordScript,
  getSelectRecordsByIdScript,
} from "../helpers/getScript";

export class DiplomService {
  private static selectQuery = (education_id: number) =>
    getSelectRecordsByIdScript("Diplom", "education_id", education_id);

  private static selectLastRecordQuery = () =>
    getSelectLastRecordScript("Diplom");

  private static insertOrUpdateQuery = (diplom: DiplomDto) =>
    getInsertOrUpdateRecordScript("Diplom", diplom);

  public static async getEducationDiploms(
    education_id: number
  ): Promise<DiplomDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const diploms = await db.select<DiplomDto[]>(
      this.selectQuery(education_id)
    );
    return diploms;
  }

  public static async setDiplom(diplom: DiplomDto): Promise<DiplomDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(diplom);
    const res_diplom = await db.select<DiplomDto>(this.selectLastRecordQuery());
    return res_diplom;
  }
}
