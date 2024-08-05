import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { PositionDto } from "../models/Dto";
import { getQueryStringValue } from "../../helpers/getQueryStringValue";
import { PositionFrontDto } from "../../models/FrontDto";

export class MigrationService {
  public static async getResumePositions(
    resumeId: number
  ): Promise<PositionDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const resumePositions = await db.select<PositionDto[]>(
      `SELECT Position.* FROM Position INNER JOIN ResumePosition ON Position.id = ResumePosition.position_id WHERE ResumePosition.resume_id = ${resumeId}`
    );
    return resumePositions;
  }

  public static async addPosition(
    position: PositionFrontDto
  ): Promise<PositionDto> {
    const db = await SQLite.open(databaseOptions.db);
    await (!position.id
      ? db.execute(
          "INSERT INTO Position (title, salary, summary, expectation, unvisible) VALUES (?1', ?2', ?3, ?4, ?5)",
          [
            getQueryStringValue(position.title),
            position.salary,
            getQueryStringValue(position.summary),
            getQueryStringValue(position.expectation),
            position.unvisible,
          ]
        )
      : db.execute(
          "UPDATE Position SET title = ?1, salary = ?2, summary = ?3, expectation = ?4, unvisible = ?5 WHERE id = ?6",
          [
            getQueryStringValue(position.title),
            position.salary,
            getQueryStringValue(position.summary),
            getQueryStringValue(position.expectation),
            position.unvisible,
            position.id,
          ]
        ));
    const res_position = await db.select<PositionDto>(
      "SELECT * FROM Position ORDER BY id DESC LIMIT 1"
    );
    // await db.close();
    return res_position;
  }
}
