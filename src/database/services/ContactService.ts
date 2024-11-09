import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ContactDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class ContactService {
  private static selectQuery = (resume_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Contact", "resume_id", resume_id);

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Contact", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("Contact");

  private static insertOrUpdateQuery = (contact: ContactDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Contact", contact);

  public static async getResumeContacts(
    resume_id: number
  ): Promise<ContactDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const contacts = await db.select<ContactDto[]>(this.selectQuery(resume_id));
    return contacts;
  }

  public static async setContact(contact: ContactDto): Promise<ContactDto> {
    const db = await SQLite.open(databaseOptions.db);
    console.log(this.insertOrUpdateQuery(contact));
    await db.execute(this.insertOrUpdateQuery(contact));
    const res_contact = await db.select<ContactDto>(
      !contact.id ? this.selectLastRecordQuery() : this.selectRecordByIdQuery(contact.id)
    );
    return res_contact;
  }
}
