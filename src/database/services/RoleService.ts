import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { RoleDto } from "../models/Dto";
import {
  getInsertOrUpdateRecordScript,
  getSelectLastRecordScript,
  getSelectRecordsUseRelatedTableScript,
} from "../helpers/getScript";

export class RoleService {
  private static selectQuery = (project_id: number) =>
    getSelectRecordsUseRelatedTableScript(
      "Role",
      "ProjectRole",
      "id",
      "role_id",
      "project_id",
      project_id
    );

  private static selectLastRecordQuery = () =>
    getSelectLastRecordScript("Role");

  private static insertOrUpdateQuery = (role: RoleDto) =>
    getInsertOrUpdateRecordScript("Role", role);

  public static async getResumeRoles(project_id: number): Promise<RoleDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const roles = await db.select<RoleDto[]>(this.selectQuery(project_id));
    return roles;
  }

  public static async setRole(role: RoleDto): Promise<RoleDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(role);
    const res_role = await db.select<RoleDto>(this.selectLastRecordQuery());
    return res_role;
  }
}
