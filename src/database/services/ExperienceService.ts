import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ExperienceDto } from "../models/Dto";
import {
  getInsertOrUpdateRecordScript,
  getSelectLastRecordScript,
  getSelectRecordsByIdScript,
} from "../helpers/getScript";
import { ExperienceAchievementService } from "./ExperienceAchievementService";
import { ProjectService } from "./ProjectService";
import { ExperienceTaskService } from "./ExperienceTaskService";

export class ExperienceService {
  private static selectQuery = (resume_id: number) =>
    getSelectRecordsByIdScript("Experience", "resume_id", resume_id);

  private static selectLastRecordQuery = () =>
    getSelectLastRecordScript("Experience");

  private static insertOrUpdateQuery = (experience: ExperienceDto) =>
    getInsertOrUpdateRecordScript("Experience", experience);

  public static async getResumeExperiences(
    resume_id: number
  ): Promise<ExperienceDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const experiences = await db.select<ExperienceDto[]>(
      this.selectQuery(resume_id)
    );
    experiences.forEach(async (item) => {
      item.achievements =
        await ExperienceAchievementService.getExperienceAchievements(item.id);
      item.projects = await ProjectService.getExperienceProjects(item.id);
      item.tasks = await ExperienceTaskService.getExperienceTasks(item.id);
    });
    return experiences;
  }

  public static async setExperience(
    experience: ExperienceDto
  ): Promise<ExperienceDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(experience);
    const res_experience = await db.select<ExperienceDto>(
      this.selectLastRecordQuery()
    );
    return res_experience;
  }
}
