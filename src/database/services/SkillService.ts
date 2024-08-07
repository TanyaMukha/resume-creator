import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { SkillDto } from "../models/Dto";
import {
  getInsertOrUpdateRecordScript,
  getSelectLastRecordScript,
  getSelectRecordsUseRelatedTableScript,
} from "../helpers/getScript";

export class SkillService {
  private static selectQuery = (position_id: number) =>
    getSelectRecordsUseRelatedTableScript(
      "Skill",
      "PositionSkill",
      "id",
      "skill_id",
      "position_id",
      position_id
    );

  private static selectLastRecordQuery = () =>
    getSelectLastRecordScript("Skill");

  private static insertOrUpdateQuery = (skill: SkillDto) =>
    getInsertOrUpdateRecordScript("Skill", skill);

  public static async getPositionSkills(
    position_id: number
  ): Promise<SkillDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const skills = await db.select<SkillDto[]>(this.selectQuery(position_id));
    return skills;
  }

  public static async setSkill(skill: SkillDto): Promise<SkillDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(skill);
    const res_skill = await db.select<SkillDto>(this.selectLastRecordQuery());
    return res_skill;
  }
}
