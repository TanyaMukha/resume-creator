import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { PositionDto } from "../models/Dto";
import { SkillService } from "./SkillService";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class PositionService {
  private static selectQuery = (resume_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Position", "resume_id", resume_id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("Position");

  private static insertOrUpdateQuery = (position: PositionDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Position", position);

  public static async getResumePositions(
    resume_id: number
  ): Promise<PositionDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const positions = await db.select<PositionDto[]>(
      this.selectQuery(resume_id)
    );
    positions.forEach(async (item) => {
      item.skills = await SkillService.getPositionSkills(item.id);
    });
    return positions;
  }

  public static async setPosition(position: PositionDto): Promise<PositionDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(position);
    const res_position = await db.select<PositionDto>(
      this.selectLastRecordQuery()
    );
    return res_position;
  }
}
