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

  private static insertOrUpdateQuery = (skill: SkillDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Skill", skill);

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

  public static async setSkill(skill: SkillDto): Promise<SkillDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(skill);
    const res_skill = await db.select<SkillDto>(this.selectLastRecordQuery());
    return res_skill;
  }
}
