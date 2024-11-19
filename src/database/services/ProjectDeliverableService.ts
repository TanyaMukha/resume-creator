import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ProjectDeliverableDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class ProjectDeliverableService {
  private static selectQuery = (project_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript(
      "ProjectDeliverable",
      "project_id",
      project_id
    );

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("ProjectDeliverable", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("ProjectDeliverable");

  private static insertOrUpdateQuery = (achievement: ProjectDeliverableDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript(
      "ProjectDeliverable",
      achievement
    );

  public static async getProjectDeliverables(
    project_id: number
  ): Promise<ProjectDeliverableDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const achievements = await db.select<ProjectDeliverableDto[]>(
      this.selectQuery(project_id)
    );
    return achievements;
  }

  public static async saveProjectDeliverable(
    achievement: ProjectDeliverableDto
  ): Promise<ProjectDeliverableDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(achievement));
    const res_achievement = await db.select<ProjectDeliverableDto[]>(
      !achievement.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(achievement.id)
    );
    return res_achievement?.[0];
  }
}
