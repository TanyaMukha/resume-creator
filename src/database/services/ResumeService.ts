import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ResumeDto } from "../models/Dto";
import { getInsertOrUpdateRecordScript } from "../helpers/getScript";
import { ContactService } from "./ContactService";
import { LanguageService } from "./LanguageService";
import { PositionService } from "./PositionService";
import { EducationService } from "./EducationService";
import { ExperienceService } from "./ExperienceService";
import { CertificateService } from "./CertificateService";

export class ResumeService {
  private static selectQuery = () => "SELECT * FROM Resume LIMIT 1";

  private static insertOrUpdateQuery = (resume: ResumeDto) =>
    getInsertOrUpdateRecordScript("Resume", resume);

  public static async getResume(): Promise<ResumeDto> {
    const db = await SQLite.open(databaseOptions.db);
    const resume = (await db.select<ResumeDto[]>(this.selectQuery()))[0];
    resume.contacts = await ContactService.getResumeContacts(resume.id);
    resume.languages = await LanguageService.getResumeLanguages(resume.id);
    resume.positions = await PositionService.getResumePositions(resume.id);
    resume.education = await EducationService.getResumeEducation(resume.id);
    resume.experience = await ExperienceService.getResumeExperiences(resume.id);
    resume.certificates = await CertificateService.getResumeCertificates(
      resume.id
    );
    return resume;
  }

  public static async setResume(resume: ResumeDto): Promise<ResumeDto> {
    const db = await SQLite.open(databaseOptions.db);
    await this.insertOrUpdateQuery(resume);
    const res_resume = await db.select<ResumeDto>(this.selectQuery());
    return res_resume;
  }
}
