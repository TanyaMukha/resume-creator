import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ProjectAchievementDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class ProjectAchievementService {
  private static selectQuery = (project_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript(
      "ProjectAchievement",
      "project_id",
      project_id
    );

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("ProjectAchievement", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("ProjectAchievement");

  private static insertOrUpdateQuery = (achievement: ProjectAchievementDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript(
      "ProjectAchievement",
      achievement
    );

  public static async getProjectAchievements(
    project_id: number
  ): Promise<ProjectAchievementDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const achievements = await db.select<ProjectAchievementDto[]>(
      this.selectQuery(project_id)
    );
    return achievements;
  }

  public static async saveProjectAchievement(
    achievement: ProjectAchievementDto
  ): Promise<ProjectAchievementDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(achievement));
    const res_achievement = await db.select<ProjectAchievementDto[]>(
      !achievement.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(achievement.id)
    );
    return res_achievement?.[0];
  }
}
