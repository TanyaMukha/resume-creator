import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import {
  ExperienceAchievementDto,
  ExperienceDto,
  ExperienceTaskDto,
  ProjectDto,
} from "../models/Dto";
import { ExperienceAchievementService } from "./ExperienceAchievementService";
import { ProjectService } from "./ProjectService";
import { ExperienceTaskService } from "./ExperienceTaskService";
import { QueryBuilder } from "../helpers/QueryBuilder";
import { DataHelper } from "../helpers/DataHelper";

export class ExperienceService {
  private static selectQuery = (resume_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript(
      "Experience",
      "resume_id",
      resume_id
    );

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Experience", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("Experience");

  private static insertOrUpdateQuery = (experience: ExperienceDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Experience", experience);

  private static deleteExperienceAchievementsQuery = (
    experience_id: number,
    achievement_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("ExperienceAchievement", {
      experience_id: experience_id,
      id: achievement_id,
    });

  private static deleteExperienceTasksQuery = (
    experience_id: number,
    task_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("ExperienceTask", {
      experience_id: experience_id,
      id: task_id,
    });

  private static deleteExperienceProjectsQuery = (
    experience_id: number,
    project_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("Project", {
      experience_id: experience_id,
      id: project_id,
    });

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

  public static async saveExperience(
    experience: ExperienceDto
  ): Promise<ExperienceDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(experience));
    const res_experience = await db.select<ExperienceDto[]>(
      !experience.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(experience.id)
    );

    // Update achievements
    const res_allExperienceAchievements =
      await ExperienceAchievementService.getExperienceAchievements(
        res_experience[0].id
      );
    for (const achievement of DataHelper.getUniqueElementsById(
      res_allExperienceAchievements,
      experience.achievements ?? []
    )) {
      await db.execute(
        this.deleteExperienceAchievementsQuery(
          res_experience[0].id,
          achievement.id
        )
      );
    }
    for (const achievement of experience.achievements as ExperienceAchievementDto[]) {
      await ExperienceAchievementService.saveExperienceAchievement(achievement);
    }

    // Update achievements
    const res_allExperienceTasks =
      await ExperienceTaskService.getExperienceTasks(res_experience[0].id);
    for (const task of DataHelper.getUniqueElementsById(
      res_allExperienceTasks,
      experience.tasks ?? []
    )) {
      await db.execute(
        this.deleteExperienceTasksQuery(res_experience[0].id, task.id)
      );
    }
    for (const task of experience.tasks as ExperienceTaskDto[]) {
      await ExperienceTaskService.setExperienceTask(task);
    }

    // TODO: update projects
    const res_allProjects = await ProjectService.getExperienceProjects(
      res_experience[0].id
    );
    for (const project of DataHelper.getUniqueElementsById(
      res_allProjects,
      experience.projects ?? []
    )) {
      await db.execute(
        this.deleteExperienceProjectsQuery(res_experience[0].id, project.id)
      );
    }
    for (const project of experience.projects as ProjectDto[]) {
      await ProjectService.saveProject(project);
    }

    return res_experience?.[0];
  }
}
