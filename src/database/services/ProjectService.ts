import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import {
  ProjectAchievementDto,
  ProjectDto,
  ProjectTaskDto,
  SkillDto,
} from "../models/Dto";
import { ProjectTaskService } from "./ProjectTaskService";
import { ProjectAchievementService } from "./ProjectAchievementService";
import { RoleService } from "./RoleService";
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

  private static deleteProjectAchievementsQuery = (
    project_id: number,
    achievement_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("ProjectAchievement", {
      project_id: project_id,
      id: achievement_id,
    });

  private static deleteProjectTasksQuery = (
    project_id: number,
    task_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("ProjectTask", {
      project_id: project_id,
      id: task_id,
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
      item.roles = await RoleService.getProjectRoles(item.id);
      item.tasks = await ProjectTaskService.getProjectTasks(item.id);
      item.achievements =
        await ProjectAchievementService.getProjectAchievements(item.id);
      item.skills = await this.getProjectSkills(item.id);
    });
    return projects;
  }

  public static async addSkillToPosition(
    skill_id: number,
    project_id: number
  ) {
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

    // Update achievements
    const res_allProjectAchievements =
      await ProjectAchievementService.getProjectAchievements(res_project[0].id);
    for (const achievement of DataHelper.getUniqueElementsById(
      res_allProjectAchievements,
      project.achievements ?? []
    )) {
      await db.execute(
        this.deleteProjectAchievementsQuery(res_project[0].id, achievement.id)
      );
    }
    for (const achievement of project.achievements as ProjectAchievementDto[]) {
      await ProjectAchievementService.saveProjectAchievement(achievement);
    }

    // Update achievements
    const res_allProjectTasks = await ProjectTaskService.getProjectTasks(
      res_project[0].id
    );
    for (const task of DataHelper.getUniqueElementsById(
      res_allProjectTasks,
      project.tasks ?? []
    )) {
      await db.execute(
        this.deleteProjectTasksQuery(res_project[0].id, task.id)
      );
    }
    for (const task of project.tasks as ProjectTaskDto[]) {
      await ProjectTaskService.saveProjectTask(task);
    }

    // Update Skills
    let res_newSkill: SkillDto | undefined;
    for (const skill of project.skills.filter((i) => i.id === 0)) {
      try {
        res_newSkill = await SkillService.saveSkill(skill);
      } catch {
        const res = await SkillService.getSkillByValue("title", skill.title);
        res_newSkill = res.length > 0 ? res[0] : undefined;
      }
      if (res_newSkill)
        await this.addSkillToPosition(res_newSkill.id, res_project[0].id);
    }
    const res_allProjectSkills = await this.getProjectSkills(project.id);
    for (const skill of DataHelper.getUniqueElementsById(
      res_allProjectSkills,
      project.skills
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
