import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { LanguageDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class LanguageService {
  private static selectQuery = (resume_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Language", "resume_id", resume_id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("Language");

  private static insertOrUpdateQuery = (language: LanguageDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Language", language);

  public static async getResumeLanguages(
    resume_id: number
  ): Promise<LanguageDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const languages = await db.select<LanguageDto[]>(
      this.selectQuery(resume_id)
    );
    return languages;
  }

  public static async setLanguage(language: LanguageDto): Promise<LanguageDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(language);
    const res_language = await db.select<LanguageDto>(
      this.selectLastRecordQuery()
    );
    return res_language;
  }
}
