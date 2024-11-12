import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ExperienceAchievementDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class ExperienceAchievementService {
  private static selectQuery = (experience_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript(
      "ExperienceAchievement",
      "experience_id",
      experience_id
    );

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("ExperienceAchievement", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("ExperienceAchievement");

  private static insertOrUpdateQuery = (
    achievement: ExperienceAchievementDto
  ) =>
    QueryBuilder.getInsertOrUpdateRecordScript(
      "ExperienceAchievement",
      achievement
    );

  public static async getExperienceAchievements(
    experience_id: number
  ): Promise<ExperienceAchievementDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const achievements = await db.select<ExperienceAchievementDto[]>(
      this.selectQuery(experience_id)
    );
    return achievements;
  }

  public static async saveExperienceAchievement(
    achievement: ExperienceAchievementDto
  ): Promise<ExperienceAchievementDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(achievement));
    const res_achievement = await db.select<ExperienceAchievementDto[]>(
      !achievement.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(achievement.id)
    );
    return res_achievement?.[0];
  }
}
