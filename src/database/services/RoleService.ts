import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { RoleDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class RoleService {
  private static selectQuery = (project_id: number) =>
    QueryBuilder.getSelectRecordsUseRelatedTableScript(
      "Role",
      "ProjectRole",
      "id",
      "role_id",
      "project_id",
      project_id
    );

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Role", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("Role");

  private static insertOrUpdateQuery = (role: RoleDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Role", role);

  public static async getProjectRoles(project_id: number): Promise<RoleDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const roles = await db.select<RoleDto[]>(this.selectQuery(project_id));
    return roles;
  }

  public static async saveRole(role: RoleDto): Promise<RoleDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(role));
    const res_role = await db.select<RoleDto>(
      !role.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(role.id)
    );
    return res_role;
  }
}
