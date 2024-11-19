import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ReferenceDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class ReferenceService {
  private static selectQuery = (resume_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Reference", "resume_id", resume_id);

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Reference", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("Reference");

  private static insertOrUpdateQuery = (reference: ReferenceDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Reference", reference);

  public static async getResumeReferences(
    resume_id: number
  ): Promise<ReferenceDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const references = await db.select<ReferenceDto[]>(this.selectQuery(resume_id));
    return references;
  }

  public static async saveReference(reference: ReferenceDto): Promise<ReferenceDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(reference));
    const res_reference = await db.select<ReferenceDto[]>(
      !reference.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(reference.id)
    );
    return res_reference?.[0];
  }
}
