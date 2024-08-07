import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ProjectDto } from "../models/Dto";
import {
  getInsertOrUpdateRecordScript,
  getSelectLastRecordScript,
  getSelectRecordsByIdScript,
} from "../helpers/getScript";
import { ProjectTaskService } from "./ProjectTaskService";
import { ProjectAchievementService } from "./ProjectAchievementService";
import { SkillService } from "./SkillService";
import { RoleService } from "./RoleService";

export class ProjectService {
  private static selectQuery = (experience_id: number) =>
    getSelectRecordsByIdScript("Project", "experience_id", experience_id);

  private static selectLastRecordQuery = () =>
    getSelectLastRecordScript("Project");

  private static insertOrUpdateQuery = (project: ProjectDto) =>
    getInsertOrUpdateRecordScript("Project", project);

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
      item.skills = await SkillService.getProjectSkills(item.id);
    });
    return projects;
  }

  public static async setProject(project: ProjectDto): Promise<ProjectDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(project);
    const res_project = await db.select<ProjectDto>(
      this.selectLastRecordQuery()
    );
    return res_project;
  }
}
