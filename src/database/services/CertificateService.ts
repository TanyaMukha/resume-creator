import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { CertificateDto } from "../models/Dto";
import {
  getInsertOrUpdateRecordScript,
  getSelectLastRecordScript,
  getSelectRecordsByIdScript,
} from "../helpers/getScript";

export class CertificateService {
  private static selectQuery = (resume_id: number) =>
    getSelectRecordsByIdScript("Certifacate", "resume_id", resume_id);

  private static selectLastRecordQuery = () =>
    getSelectLastRecordScript("Certificate");

  private static insertOrUpdateQuery = (certificate: CertificateDto) =>
    getInsertOrUpdateRecordScript("Certificate", certificate);

  public static async getResumeCertificates(
    resume_id: number
  ): Promise<CertificateDto[]> {
    const db = await SQLite.open(databaseOptions.db);
    const certificates = await db.select<CertificateDto[]>(
      this.selectQuery(resume_id)
    );
    return certificates;
  }

  public static async setCertificate(
    certificate: CertificateDto
  ): Promise<CertificateDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(certificate);
    const res_certificate = await db.select<CertificateDto>(
      this.selectLastRecordQuery()
    );
    return res_certificate;
  }
}
