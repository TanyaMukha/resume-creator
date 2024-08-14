import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ExperienceTaskDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class ExperienceTaskService {
  private static selectQuery = (experience_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript(
      "ExperienceTask",
      "experience_id",
      experience_id
    );

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("ExperienceTask");

  private static insertOrUpdateQuery = (task: ExperienceTaskDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("ExperienceTask", task);

  public static async getExperienceTasks(
    experience_id: number
  ): Promise<ExperienceTaskDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const tasks = await db.select<ExperienceTaskDto[]>(
      this.selectQuery(experience_id)
    );
    return tasks;
  }

  public static async setExperienceTask(
    task: ExperienceTaskDto
  ): Promise<ExperienceTaskDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(task);
    const res_task = await db.select<ExperienceTaskDto>(
      this.selectLastRecordQuery()
    );
    return res_task;
  }
}
