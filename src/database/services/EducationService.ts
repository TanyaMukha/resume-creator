import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { EducationDto } from "../models/Dto";
import {
  getInsertOrUpdateRecordScript,
  getSelectLastRecordScript,
  getSelectRecordsByIdScript,
} from "../helpers/getScript";

export class EducationService {
  private static selectQuery = (resume_id: number) =>
    getSelectRecordsByIdScript("Education", "resume_id", resume_id);

  private static selectLastRecordQuery = () =>
    getSelectLastRecordScript("Education");

  private static insertOrUpdateQuery = (education: EducationDto) =>
    getInsertOrUpdateRecordScript("Education", education);

  public static async getResumeEducation(
    resume_id: number
  ): Promise<EducationDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const education = await db.select<EducationDto[]>(
      this.selectQuery(resume_id)
    );
    return education;
  }

  public static async setEducation(
    education: EducationDto
  ): Promise<EducationDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(education);
    const res_education = await db.select<EducationDto>(
      this.selectLastRecordQuery()
    );
    return res_education;
  }
}
