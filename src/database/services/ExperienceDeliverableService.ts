import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ExperienceDeliverableDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class ExperienceDeliverableService {
  private static selectQuery = (experience_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript(
      "ExperienceDeliverable",
      "experience_id",
      experience_id
    );

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("ExperienceDeliverable", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("ExperienceDeliverable");

  private static insertOrUpdateQuery = (
    achievement: ExperienceDeliverableDto
  ) =>
    QueryBuilder.getInsertOrUpdateRecordScript(
      "ExperienceDeliverable",
      achievement
    );

  public static async getExperienceDeliverables(
    experience_id: number
  ): Promise<ExperienceDeliverableDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const achievements = await db.select<ExperienceDeliverableDto[]>(
      this.selectQuery(experience_id)
    );
    return achievements;
  }

  public static async saveExperienceDeliverable(
    achievement: ExperienceDeliverableDto
  ): Promise<ExperienceDeliverableDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(achievement));
    const res_achievement = await db.select<ExperienceDeliverableDto[]>(
      !achievement.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(achievement.id)
    );
    return res_achievement?.[0];
  }
}
