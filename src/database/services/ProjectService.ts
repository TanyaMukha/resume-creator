import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import {
  ProjectDeliverableDto,
  ProjectDto,
  SkillDto,
} from "../models/Dto";
import { ProjectDeliverableService } from "./ProjectDeliverableService";
import { QueryBuilder } from "../helpers/QueryBuilder";
import { DataHelper } from "../helpers/DataHelper";
import { SkillService } from "./SkillService";

export class ProjectService {
  private static selectQuery = (experience_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript(
      "Project",
      "experience_id",
      experience_id
    );

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Project", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("Project");

  private static selectProjectSkillsQuery = (project_id: number) =>
    QueryBuilder.getSelectRecordsUseRelatedTableScript(
      "Skill",
      "ProjectSkill",
      "id",
      "skill_id",
      "project_id",
      project_id
    );

  private static insertOrUpdateQuery = (project: ProjectDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Project", project);

  private static insertProjectSkillQuery = (skill: {
    id: number;
    skill_id: number;
    project_id: number;
  }) => QueryBuilder.getInsertOrUpdateRecordScript("ProjectSkill", skill);

  private static deleteProjectDeliverablesQuery = (
    project_id: number,
    deliverable_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("ProjectDeliverable", {
      project_id: project_id,
      id: deliverable_id,
    });

  private static deleteProjectSkillQuery = (data: Record<string, any>) =>
    QueryBuilder.getDeleteRecordScript("ProjectSkill", data);

  public static async getProjectSkills(
    project_id: number
  ): Promise<SkillDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const skills = await db.select<SkillDto[]>(
      this.selectProjectSkillsQuery(project_id)
    );
    return skills;
  }

  public static async getExperienceProjects(
    experience_id: number
  ): Promise<ProjectDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const projects = await db.select<ProjectDto[]>(
      this.selectQuery(experience_id)
    );
    projects.forEach(async (item) => {
      item.deliverables =
        await ProjectDeliverableService.getProjectDeliverables(item.id);
      item.hard_skills = await this.getProjectSkills(item.id);
    });
    return projects;
  }

  public static async addSkillToProject(skill_id: number, project_id: number) {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(
      this.insertProjectSkillQuery({
        id: 0,
        skill_id: skill_id,
        project_id: project_id,
      })
    );
    return;
  }

  public static async saveProject(project: ProjectDto): Promise<ProjectDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(project));
    const res_project = await db.select<ProjectDto[]>(
      !project.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(project.id)
    );

    // Update deliverables
    const res_allProjectDeliverables =
      await ProjectDeliverableService.getProjectDeliverables(res_project[0].id);
    for (const deliverable of DataHelper.getUniqueElementsById(
      res_allProjectDeliverables,
      project.deliverables ?? []
    )) {
      await db.execute(
        this.deleteProjectDeliverablesQuery(res_project[0].id, deliverable.id)
      );
    }
    for (const deliverable of project.deliverables as ProjectDeliverableDto[]) {
      await ProjectDeliverableService.saveProjectDeliverable(deliverable);
    }

    // Update Skills
    let res_newSkill: SkillDto | undefined;
    for (const skill of project.hard_skills.filter((i) => i.id === 0)) {
      try {
        res_newSkill = await SkillService.saveSkill(skill);
      } catch {
        const res = await SkillService.getSkillByValue("title", skill.title);
        res_newSkill = res.length > 0 ? res[0] : undefined;
      }
      if (res_newSkill)
        await this.addSkillToProject(res_newSkill.id, res_project[0].id);
    }
    const res_allProjectSkills = await this.getProjectSkills(project.id);
    for (const skill of DataHelper.getUniqueElementsById(
      res_allProjectSkills,
      project.hard_skills
    )) {
      await db.execute(
        this.deleteProjectSkillQuery({
          project_id: res_project?.[0].id,
          skill_id: skill.id,
        })
      );
    }

    return res_project?.[0];
  }
}
