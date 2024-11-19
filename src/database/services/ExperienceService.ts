import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import {
  ExperienceDeliverableDto,
  ExperienceDto,
  ProjectDto,
  SkillDto,
} from "../models/Dto";
import { ExperienceDeliverableService } from "./ExperienceDeliverableService";
import { ProjectService } from "./ProjectService";
import { QueryBuilder } from "../helpers/QueryBuilder";
import { DataHelper } from "../helpers/DataHelper";
import { SkillService } from "./SkillService";

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

  private static deleteExperienceDeliverablesQuery = (
    experience_id: number,
    deliverable_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("ExperienceDeliverable", {
      experience_id: experience_id,
      id: deliverable_id,
    });

  private static deleteExperienceProjectsQuery = (
    experience_id: number,
    project_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("Project", {
      experience_id: experience_id,
      id: project_id,
    });

  private static selectExperienceSkillsQuery = (experience_id: number) =>
    QueryBuilder.getSelectRecordsUseRelatedTableScript(
      "Skill",
      "ExperienceSkill",
      "id",
      "skill_id",
      "experience_id",
      experience_id
    );

  private static insertExperienceSkillQuery = (skill: {
    id: number;
    skill_id: number;
    experience_id: number;
  }) => QueryBuilder.getInsertOrUpdateRecordScript("ExperienceSkill", skill);

  private static deleteExperienceSkillQuery = (data: Record<string, any>) =>
    QueryBuilder.getDeleteRecordScript("ExperienceSkill", data);

  public static async getExperienceSkills(
    experience_id: number
  ): Promise<SkillDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const skills = await db.select<SkillDto[]>(
      this.selectExperienceSkillsQuery(experience_id)
    );
    return skills;
  }

  public static async addSkillToExperience(
    skill_id: number,
    experience_id: number
  ) {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(
      this.insertExperienceSkillQuery({
        id: 0,
        skill_id: skill_id,
        experience_id: experience_id,
      })
    );
    return;
  }

  public static async getResumeExperiences(
    resume_id: number
  ): Promise<ExperienceDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const experiences = await db.select<ExperienceDto[]>(
      this.selectQuery(resume_id)
    );
    experiences.forEach(async (item) => {
      item.deliverables =
        await ExperienceDeliverableService.getExperienceDeliverables(item.id);
      item.projects = await ProjectService.getExperienceProjects(item.id);
      item.hard_skills = await this.getExperienceSkills(item.id);
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

    // Update deliverables
    const res_allExperienceDeliverables =
      await ExperienceDeliverableService.getExperienceDeliverables(
        res_experience[0].id
      );
    for (const deliverable of DataHelper.getUniqueElementsById(
      res_allExperienceDeliverables,
      experience.deliverables ?? []
    )) {
      await db.execute(
        this.deleteExperienceDeliverablesQuery(
          res_experience[0].id,
          deliverable.id
        )
      );
    }
    for (const deliverable of experience.deliverables as ExperienceDeliverableDto[]) {
      await ExperienceDeliverableService.saveExperienceDeliverable(deliverable);
    }

    // Update Skills
    let res_newSkill: SkillDto | undefined;
    for (const skill of experience.hard_skills.filter((i) => i.id === 0)) {
      try {
        res_newSkill = await SkillService.saveSkill(skill);
      } catch {
        const res = await SkillService.getSkillByValue("title", skill.title);
        res_newSkill = res.length > 0 ? res[0] : undefined;
      }
      if (res_newSkill)
        await this.addSkillToExperience(res_newSkill.id, res_experience[0].id);
    }
    const res_allExperienceSkills = await this.getExperienceSkills(
      experience.id
    );
    for (const skill of DataHelper.getUniqueElementsById(
      res_allExperienceSkills,
      experience.hard_skills
    )) {
      await db.execute(
        this.deleteExperienceSkillQuery({
          experience_id: res_experience?.[0].id,
          skill_id: skill.id,
        })
      );
    }

    // Update projects
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
