import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { PositionDto, SkillDto } from "../models/Dto";
import { SkillService } from "./SkillService";
import { QueryBuilder } from "../helpers/QueryBuilder";
import { DataHelper } from "../helpers/DataHelper";

export class PositionService {
  private static selectQuery = (resume_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Position", "resume_id", resume_id);

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Position", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("Position");

  private static selectPositionSkillsQuery = (position_id: number) =>
    QueryBuilder.getSelectRecordsUseRelatedTableScript(
      "Skill",
      "PositionSkill",
      "id",
      "skill_id",
      "position_id",
      position_id
    );

  private static insertOrUpdateQuery = (position: PositionDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Position", position);

  private static insertPositionSkillQuery = (skill: {
    id: number;
    skill_id: number;
    position_id: number;
  }) => QueryBuilder.getInsertOrUpdateRecordScript("PositionSkill", skill);

  private static deletePositionSkillQuery = (data: Record<string, any>) =>
    QueryBuilder.getDeleteRecordScript("PositionSkill", data);

  public static async getResumePositions(
    resume_id: number
  ): Promise<PositionDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const positions = await db.select<PositionDto[]>(
      this.selectQuery(resume_id)
    );
    positions.forEach(async (item) => {
      item.hard_skills = await this.getPositionSkills(item.id);
    });
    return positions;
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

  public static async addSkillToPosition(
    skill_id: number,
    position_id: number
  ) {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(
      this.insertPositionSkillQuery({
        id: 0,
        skill_id: skill_id,
        position_id: position_id,
      })
    );
    return;
  }

  public static async savePosition(
    position: PositionDto
  ): Promise<PositionDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(position));
    const res_position = await db.select<PositionDto[]>(
      !position.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(position.id)
    );

    // Update Skills
    let res_newSkill: SkillDto | undefined;
    for (const skill of position.hard_skills.filter((i) => i.id === 0)) {
      try {
        res_newSkill = await SkillService.saveSkill(skill);
      } catch {
        const res = await SkillService.getSkillByValue("title", skill.title);
        res_newSkill = res.length > 0 ? res[0] : undefined;
      }
      if (res_newSkill)
        await this.addSkillToPosition(res_newSkill.id, res_position[0].id);
    }
    const res_allPositionSkills = await this.getPositionSkills(position.id);
    for (const skill of DataHelper.getUniqueElementsById(
      res_allPositionSkills,
      position.hard_skills
    )) {
      await db.execute(
        this.deletePositionSkillQuery({
          position_id: position.id,
          skill_id: skill.id,
        })
      );
    }

    return res_position?.[0];
  }
}
