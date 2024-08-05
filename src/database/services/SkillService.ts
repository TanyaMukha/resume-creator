import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { SkillDto } from "../models/Dto";
import { getQueryStringValue } from "../../helpers/getQueryStringValue";
import { SkillFrontDto } from "../../models/FrontDto";

export class MigrationService {
  public static async getPositionSkills(
    positionId: number
  ): Promise<SkillDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const positionSkills = await db.select<SkillDto[]>(
      `SELECT Skill.* FROM Skill INNER JOIN PositionSkill ON Skill.id = PositionSkill.position_id WHERE PositionSkill.position_id = ${positionId}`
    );
    return positionSkills;
  }

  public static async addSkill(skill: SkillFrontDto): Promise<SkillDto> {
    const db = await SQLite.open(databaseOptions.db);
    await (!skill.id
      ? db.execute(
          "INSERT INTO Skill (title, order, unvisible) VALUES (?1', ?2', ?3)",
          [getQueryStringValue(skill.title), skill.order, skill.unvisible]
        )
      : db.execute(
          "UPDATE Skill SET title = ?1, order = ?2, unvisible = ?3 WHERE id = ?4",
          [
            getQueryStringValue(skill.title),
            skill.order,
            skill.unvisible,
            skill.id,
          ]
        ));
    const res_skill = await db.select<SkillDto>(
      "SELECT * FROM Skill ORDER BY id DESC LIMIT 1"
    );
    // await db.close();
    return res_skill;
  }
}
