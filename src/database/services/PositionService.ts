import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { PositionDto } from "../models/Dto";
import {
  getInsertOrUpdateRecordScript,
  getSelectLastRecordScript,
  getSelectRecordsByIdScript,
} from "../helpers/getScript";
import { SkillService } from "./SkillService";

export class PositionService {
  private static selectQuery = (resume_id: number) =>
    getSelectRecordsByIdScript("Position", "resume_id", resume_id);

  private static selectLastRecordQuery = () =>
    getSelectLastRecordScript("Position");

  private static insertOrUpdateQuery = (position: PositionDto) =>
    getInsertOrUpdateRecordScript("Position", position);

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
