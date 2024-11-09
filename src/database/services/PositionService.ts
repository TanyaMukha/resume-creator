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

  private static insertOrUpdateQuery = (position: PositionDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Position", position);

  private static deletePositionSkill = (data: Record<string, any>) =>
    QueryBuilder.getDeleteRecordScript("PositionSkill", data);

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
    console.log(this.insertOrUpdateQuery(position));
    await db.execute(this.insertOrUpdateQuery(position));
    const res_position = await db.select<PositionDto[]>(
      !position.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(position.id)
    );
    let res_newSkill: SkillDto | undefined;
    for (const skill of position.skills.filter((i) => i.id === 0)) {
      try {
        res_newSkill = await SkillService.setSkill(skill);
      } catch {
        const res = await SkillService.getSkillByValue("title", skill.title);
        res_newSkill = res.length > 0 ? res[0] : undefined;
      }
      if (res_newSkill)
        await SkillService.setPositionSkill(
          res_newSkill.id,
          res_position[0].id
        );
    }
    const res_allPositionSkills = await SkillService.getPositionSkills(
      position.id
    );
    for (const skill of DataHelper.getUniqueElementsById(
      res_allPositionSkills,
      position.skills
    )) {
      console.log(
        this.deletePositionSkill({
          position_id: position.id,
          skill_id: skill.id,
        })
      );
      await db.execute(
        this.deletePositionSkill({
          position_id: position.id,
          skill_id: skill.id,
        })
      );
    }
    return res_position[0];
  }
}
