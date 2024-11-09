import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import { ContactDto, PositionDto, ResumeDto } from "../models/Dto";
import { ContactService } from "./ContactService";
import { LanguageService } from "./LanguageService";
import { PositionService } from "./PositionService";
import { EducationService } from "./EducationService";
import { ExperienceService } from "./ExperienceService";
import { CertificateService } from "./CertificateService";
import { QueryBuilder } from "../helpers/QueryBuilder";

export class ResumeService {
  private static selectQuery = () => "SELECT * FROM Resume LIMIT 1";

  private static insertOrUpdateQuery = (resume: ResumeDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Resume", resume);

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
    console.log(this.insertOrUpdateQuery(resume));
    await db.execute(this.insertOrUpdateQuery(resume));
    const res_resume = await db.select<ResumeDto>(this.selectQuery());
    return res_resume;
  }

  public static saveResume(resume: ResumeDto): Promise<ResumeDto> {
    (resume.positions as PositionDto[]).forEach((item) =>
      PositionService.setPosition(item).then((res) => console.log(item, res))
    );
    (resume.contacts as ContactDto[]).forEach((item) =>
      ContactService.setContact(item).then((res) => console.log(item, res))
    );
    this.setResume(resume);
    return this.getResume();
  }
}
