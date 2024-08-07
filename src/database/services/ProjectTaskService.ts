import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ProjectTaskDto } from "../models/Dto";
import {
  getInsertOrUpdateRecordScript,
  getSelectLastRecordScript,
  getSelectRecordsByIdScript,
} from "../helpers/getScript";

export class ProjectTaskService {
  private static selectQuery = (project_id: number) =>
    getSelectRecordsByIdScript("ProjectTask", "project_id", project_id);

  private static selectLastRecordQuery = () =>
    getSelectLastRecordScript("ProjectTask");

  private static insertOrUpdateQuery = (task: ProjectTaskDto) =>
    getInsertOrUpdateRecordScript("ProjectTask", task);

  public static async getProjectTasks(
    project_id: number
  ): Promise<ProjectTaskDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const tasks = await db.select<ProjectTaskDto[]>(this.selectQuery(project_id));
    return tasks;
  }

  public static async setProjectTask(task: ProjectTaskDto): Promise<ProjectTaskDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(task);
    const res_task = await db.select<ProjectTaskDto>(
      this.selectLastRecordQuery()
    );
    return res_task;
  }
}