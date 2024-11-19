import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { SkillGroupDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class SkillGroupService {
  private static selectSkillGroupsQuery = () =>
    QueryBuilder.getSelectRecordsScript("SkillGroup");

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("SkillGroup", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("SkillGroup");

  private static selectRecordByValueQuery = (field: string, value: any) =>
    QueryBuilder.getSelectRecordsByValueScript("SkillGroup", field, value);

  private static insertOrUpdateQuery = (group: SkillGroupDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("SkillGroup", group);

  public static async getSkillGroups(): Promise<SkillGroupDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const groups = await db.select<SkillGroupDto[]>(this.selectSkillGroupsQuery());
    return groups;
  }

  public static async getSkillGroupByValue(
    field: string,
    value: any
  ): Promise<SkillGroupDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const groups = await db.select<SkillGroupDto[]>(
      this.selectRecordByValueQuery(field, value)
    );
    return groups;
  }

  public static async saveSkillGroup(group: SkillGroupDto): Promise<SkillGroupDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(group));
    const res_group = await db.select<SkillGroupDto[]>(
      !group.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(group.id)
    );
    return res_group?.[0];
  }
}
