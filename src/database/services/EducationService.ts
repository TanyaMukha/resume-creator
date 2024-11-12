import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { DiplomDto, EducationDto } from "../models/Dto";
import { DiplomService } from "./DiplomService";
import { QueryBuilder } from "../helpers/QueryBuilder";
import { DataHelper } from "../helpers/DataHelper";

export class EducationService {
  private static selectQuery = (resume_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript(
      "Education",
      "resume_id",
      resume_id
    );

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Education", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("Education");

  private static insertOrUpdateQuery = (education: EducationDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Education", education);

  private static deleteEducationDiplomQuery = (
    resume_id: number,
    diplom_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("Diplom", {
      resume_id: resume_id,
      id: diplom_id,
    });

  public static async getResumeEducation(
    resume_id: number
  ): Promise<EducationDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const education = await db.select<EducationDto[]>(
      this.selectQuery(resume_id)
    );
    education.forEach(async (item) => {
      item.diploms = await DiplomService.getEducationDiploms(item.id);
    });
    return education;
  }

  public static async saveEducation(
    education: EducationDto
  ): Promise<EducationDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(education));
    const res_education = await db.select<EducationDto[]>(
      !education.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(education.id)
    );

    // Update Diploms
    const res_allEducationDiploms = await DiplomService.getEducationDiploms(
      res_education[0].id
    );
    for (const diplom of DataHelper.getUniqueElementsById(
      res_allEducationDiploms,
      education.diploms
    )) {
      await db.execute(
        this.deleteEducationDiplomQuery(res_education[0].id, diplom.id)
      );
    }
    for (const diplom of education.diploms as DiplomDto[]) {
      await DiplomService.saveDiplom(diplom);
    }

    return res_education?.[0];
  }
}
