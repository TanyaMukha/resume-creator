import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { SkillDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class SkillService {
  private static selectSkillsQuery = () =>
    QueryBuilder.getSelectRecordsScript("Skill");

  private static selectPositionSkillsQuery = (position_id: number) =>
    QueryBuilder.getSelectRecordsUseRelatedTableScript(
      "Skill",
      "PositionSkill",
      "id",
      "skill_id",
      "position_id",
      position_id
    );

  private static selectProjectSkillsQuery = (project_id: number) =>
    QueryBuilder.getSelectRecordsUseRelatedTableScript(
      "Skill",
      "ProjectSkill",
      "id",
      "skill_id",
      "project_id",
      project_id
    );

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("Skill");

  private static selectRecordByValueQuery = (field: string, value: any) =>
    QueryBuilder.getSelectRecordsByValueScript("Skill", field, value);

  private static insertOrUpdateQuery = (skill: SkillDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Skill", skill);

  private static insertPositionSkillQuery = (skill: {
    id: number;
    skill_id: number;
    position_id: number;
  }) => QueryBuilder.getInsertOrUpdateRecordScript("PositionSkill", skill);

  public static async getSkills(): Promise<SkillDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const skills = await db.select<SkillDto[]>(this.selectSkillsQuery());
    return skills;
  }

  public static async getPositionSkills(
    position_id: number
  ): Promise<SkillDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const skills = await db.select<SkillDto[]>(
      this.selectPositionSkillsQuery(position_id)
    );
    return skills;
  }

  public static async getProjectSkills(
    project_id: number
  ): Promise<SkillDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const skills = await db.select<SkillDto[]>(
      this.selectProjectSkillsQuery(project_id)
    );
    return skills;
  }

  public static async getSkillByValue(field: string, value: any): Promise<SkillDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const skills = await db.select<SkillDto[]>(this.selectRecordByValueQuery(field, value));
    return skills;
  }

  public static async setSkill(skill: SkillDto): Promise<SkillDto> {
    const db = await SQLite.open(databaseOptions.db);
    console.log(this.insertOrUpdateQuery(skill));
    await db.execute(this.insertOrUpdateQuery(skill));
    const res_skill = await db.select<SkillDto[]>(this.selectLastRecordQuery());
    return res_skill[0];
  }

  public static async setPositionSkill(skill_id: number, position_id: number) {
    const db = await SQLite.open(databaseOptions.db);
    console.log(
      this.insertPositionSkillQuery({
        id: 0,
        skill_id: skill_id,
        position_id: position_id,
      })
    );
    await db.execute(
      this.insertPositionSkillQuery({
        id: 0,
        skill_id: skill_id,
        position_id: position_id,
      })
    );
    return;
  }
}
