import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { CertificateDto } from "../models/Dto";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class CertificateService {
  private static selectQuery = (resume_id: number) =>
    QueryBuilder.getSelectRecordsByIdScript(
      "Certificate",
      "resume_id",
      resume_id
    );

  private static selectRecordByIdQuery = (id: number) =>
    QueryBuilder.getSelectRecordsByIdScript("Certificate", "id", id);

  private static selectLastRecordQuery = () =>
    QueryBuilder.getSelectLastRecordScript("Certificate");

  private static insertOrUpdateQuery = (certificate: CertificateDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Certificate", certificate);

  public static async getResumeCertificates(
    resume_id: number
  ): Promise<CertificateDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const certificates = await db.select<CertificateDto[]>(
      this.selectQuery(resume_id)
    );
    return certificates;
  }

  public static async saveCertificate(
    certificate: CertificateDto
  ): Promise<CertificateDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(certificate));
    const res_certificate = await db.select<CertificateDto[]>(
      !certificate.id
        ? this.selectLastRecordQuery()
        : this.selectRecordByIdQuery(certificate.id)
    );
    return res_certificate?.[0];
  }
}
