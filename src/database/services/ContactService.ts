import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ContactDto } from "../models/Dto";
import {
  getInsertOrUpdateRecordScript,
  getSelectLastRecordScript,
  getSelectRecordsByIdScript,
} from "../helpers/getScript";

export class ContactService {
  private static selectQuery = (resume_id: number) =>
    getSelectRecordsByIdScript("Contact", "resume_id", resume_id);

  private static selectLastRecordQuery = () =>
    getSelectLastRecordScript("Contact");

  private static insertOrUpdateQuery = (contact: ContactDto) =>
    getInsertOrUpdateRecordScript("Contact", contact);

  public static async getResumeContacts(
    resume_id: number
  ): Promise<ContactDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const contacts = await db.select<ContactDto[]>(this.selectQuery(resume_id));
    return contacts;
  }

  public static async setContact(contact: ContactDto): Promise<ContactDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(contact);
    const res_contact = await db.select<ContactDto>(
      this.selectLastRecordQuery()
    );
    return res_contact;
  }
}
