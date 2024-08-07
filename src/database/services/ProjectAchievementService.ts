import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ProjectAchievementDto } from "../models/Dto";
import {
  getInsertOrUpdateRecordScript,
  getSelectLastRecordScript,
  getSelectRecordsByIdScript,
} from "../helpers/getScript";

export class ProjectAchievementService {
  private static selectQuery = (project_id: number) =>
    getSelectRecordsByIdScript("ProjectAchievement", "project_id", project_id);

  private static selectLastRecordQuery = () =>
    getSelectLastRecordScript("ProjectAchievement");

  private static insertOrUpdateQuery = (achievement: ProjectAchievementDto) =>
    getInsertOrUpdateRecordScript("ProjectAchievement", achievement);

  public static async getProjectAchievements(
    project_id: number
  ): Promise<ProjectAchievementDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const achievements = await db.select<ProjectAchievementDto[]>(this.selectQuery(project_id));
    return achievements;
  }

  public static async setProjectAchievement(achievement: ProjectAchievementDto): Promise<ProjectAchievementDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(achievement);
    const res_achievement = await db.select<ProjectAchievementDto>(
      this.selectLastRecordQuery()
    );
    return res_achievement;
  }
}