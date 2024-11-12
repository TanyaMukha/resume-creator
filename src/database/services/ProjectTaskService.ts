import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ProjectTaskDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class ProjectTaskService {
  private static selectQuery = (project_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript(
      "ProjectTask",
      "project_id",
      project_id
    );

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("ProjectTask", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("ProjectTask");

  private static insertOrUpdateQuery = (task: ProjectTaskDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("ProjectTask", task);

  public static async getProjectTasks(
    project_id: number
  ): Promise<ProjectTaskDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const tasks = await db.select<ProjectTaskDto[]>(
      this.selectQuery(project_id)
    );
    return tasks;
  }

  public static async saveProjectTask(
    task: ProjectTaskDto
  ): Promise<ProjectTaskDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(task));
    const res_task = await db.select<ProjectTaskDto[]>(
      !task.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(task.id)
    );
    return res_task?.[0];
  }
}
