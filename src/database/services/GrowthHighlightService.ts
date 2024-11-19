import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { GrowthHighlightDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class GrowthHighlightService {
  private static selectQuery = (resume_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("GrowthHighlight", "resume_id", resume_id);

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("GrowthHighlight", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("GrowthHighlight");

  private static insertOrUpdateQuery = (growthHighlight: GrowthHighlightDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("GrowthHighlight", growthHighlight);

  public static async getResumeGrowthHighlights(
    resume_id: number
  ): Promise<GrowthHighlightDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const growthHighlights = await db.select<GrowthHighlightDto[]>(this.selectQuery(resume_id));
    return growthHighlights;
  }

  public static async saveGrowthHighlight(growthHighlight: GrowthHighlightDto): Promise<GrowthHighlightDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(growthHighlight));
    const res_growthHighlight = await db.select<GrowthHighlightDto[]>(
      !growthHighlight.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(growthHighlight.id)
    );
    return res_growthHighlight?.[0];
  }
}