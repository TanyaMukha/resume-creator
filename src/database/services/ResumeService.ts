import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ResumeDto } from "../models/Dto";
import { getInsertOrUpdateRecordScript } from "../helpers/getScript";

export class ResumeService {
  private static selectQuery = () => "SELECT * FROM Resume LIMIT 1";

  private static insertOrUpdateQuery = (resume: ResumeDto) =>
    getInsertOrUpdateRecordScript("Resume", resume);

  public static async getResume(): Promise<ResumeDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const resume = await db.select<ResumeDto[]>(this.selectQuery());
    return resume;
  }

  public static async setResume(resume: ResumeDto): Promise<ResumeDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(resume);
    const res_resume = await db.select<ResumeDto>(this.selectQuery());
    return res_resume;
  }
}
