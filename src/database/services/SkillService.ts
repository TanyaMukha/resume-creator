import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { SkillDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class SkillService {
  private static selectSkillsQuery = () =>
    QueryBuilder.getSelectRecordsScript("Skill");

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Skill", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("Skill");

  private static selectRecordByValueQuery = (field: string, value: any) =>
    QueryBuilder.getSelectRecordsByValueScript("Skill", field, value);

  private static insertOrUpdateQuery = (skill: SkillDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Skill", skill);

  public static async getSkills(): Promise<SkillDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const skills = await db.select<SkillDto[]>(this.selectSkillsQuery());
    return skills;
  }

  public static async getSkillByValue(
    field: string,
    value: any
  ): Promise<SkillDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const skills = await db.select<SkillDto[]>(
      this.selectRecordByValueQuery(field, value)
    );
    return skills;
  }

  public static async saveSkill(skill: SkillDto): Promise<SkillDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(skill));
    const res_skill = await db.select<SkillDto[]>(
      !skill.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(skill.id)
    );
    return res_skill?.[0];
  }
}
