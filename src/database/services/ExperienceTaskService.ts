import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ExperienceTaskDto } from "../models/Dto";
import {
  getInsertOrUpdateRecordScript,
  getSelectLastRecordScript,
  getSelectRecordsByIdScript,
} from "../helpers/getScript";

export class ExperienceTaskService {
  private static selectQuery = (experience_id: number) =>
    getSelectRecordsByIdScript("ExperienceTask", "experience_id", experience_id);

  private static selectLastRecordQuery = () =>
    getSelectLastRecordScript("ExperienceTask");

  private static insertOrUpdateQuery = (task: ExperienceTaskDto) =>
    getInsertOrUpdateRecordScript("ExperienceTask", task);

  public static async getExperienceTasks(
    experience_id: number
  ): Promise<ExperienceTaskDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const tasks = await db.select<ExperienceTaskDto[]>(this.selectQuery(experience_id));
    return tasks;
  }

  public static async setExperienceTask(task: ExperienceTaskDto): Promise<ExperienceTaskDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(task);
    const res_task = await db.select<ExperienceTaskDto>(
      this.selectLastRecordQuery()
    );
    return res_task;
  }
}