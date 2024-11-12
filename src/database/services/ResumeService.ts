import SQLite from "tauri-plugin-sqlite-api";
import { databaseOptions } from "../options";
import {
  CertificateDto,
  ContactDto,
  EducationDto,
  ExperienceDto,
  PositionDto,
  ResumeDto,
} from "../models/Dto";
import { ContactService } from "./ContactService";
import { LanguageService } from "./LanguageService";
import { PositionService } from "./PositionService";
import { EducationService } from "./EducationService";
import { ExperienceService } from "./ExperienceService";
import { CertificateService } from "./CertificateService";
import { QueryBuilder } from "../helpers/QueryBuilder";
import { DataHelper } from "../helpers/DataHelper";

export class ResumeService {
  private static selectQuery = () => "SELECT * FROM Resume LIMIT 1";

  private static insertOrUpdateQuery = (resume: ResumeDto) =>
    QueryBuilder.getInsertOrUpdateRecordScript("Resume", resume);

  private static deleteResumePositionQuery = (
    resume_id: number,
    position_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("Position", {
      resume_id: resume_id,
      id: position_id,
    });

  private static deleteResumeCertificateQuery = (
    resume_id: number,
    certificate_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("Certificate", {
      resume_id: resume_id,
      id: certificate_id,
    });

  private static deleteResumeEducationQuery = (
    resume_id: number,
    education_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("Education", {
      resume_id: resume_id,
      id: education_id,
    });

  private static deleteResumeExperienceQuery = (
    resume_id: number,
    experience_id: number
  ) =>
    QueryBuilder.getDeleteRecordScript("Experience", {
      resume_id: resume_id,
      id: experience_id,
    });

    private static deleteResumeContactQuery = (
      resume_id: number,
      contact_id: number
    ) =>
      QueryBuilder.getDeleteRecordScript("Contact", {
        resume_id: resume_id,
        id: contact_id,
      });

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

  public static async saveResume(resume: ResumeDto): Promise<ResumeDto> {
    const db = await SQLite.open(databaseOptions.db);
    await db.execute(this.insertOrUpdateQuery(resume));
    const res_resume = await db.select<ResumeDto[]>(this.selectQuery());

    // Update info about experience
    const res_allExperience = await ExperienceService.getResumeExperiences(
      res_resume?.[0].id
    );
    for (const experience of DataHelper.getUniqueElementsById(
      res_allExperience,
      resume.experience ?? []
    )) {
      await db.execute(
        this.deleteResumeExperienceQuery(res_resume?.[0].id, experience.id)
      );
    }
    for (const experience of resume.experience as ExperienceDto[]) {
      await ExperienceService.saveExperience(experience);
    }

    // Update info about education
    const res_allUniversities = await EducationService.getResumeEducation(
      res_resume?.[0].id
    );
    for (const education of DataHelper.getUniqueElementsById(
      res_allUniversities,
      resume.education ?? []
    )) {
      await db.execute(
        this.deleteResumeEducationQuery(res_resume?.[0].id, education.id)
      );
    }
    for (const education of resume.education as EducationDto[]) {
      await EducationService.saveEducation(education);
    }

    // Update info about certificates
    const res_allCertificates = await CertificateService.getResumeCertificates(
      res_resume?.[0].id
    );
    for (const certificate of DataHelper.getUniqueElementsById(
      res_allCertificates,
      resume.certificates ?? []
    )) {
      await db.execute(
        this.deleteResumeCertificateQuery(res_resume?.[0].id, certificate.id)
      );
    }    
    for (const certificate of resume.certificates as CertificateDto[]) {
      await CertificateService.saveCertificate(certificate);
    }    

    // Update info about positions
    const res_allPositions = await PositionService.getResumePositions(
      res_resume?.[0].id
    );
    for (const position of DataHelper.getUniqueElementsById(
      res_allPositions,
      resume.positions
    )) {
      await db.execute(
        this.deleteResumePositionQuery(res_resume?.[0].id, position.id)
      );
    }
    for (const position of resume.positions as PositionDto[]) {
      await PositionService.savePosition(position);
    }

    // Update info about contacts
    const res_allContacts = await ContactService.getResumeContacts(
      res_resume?.[0].id
    );
    for (const contact of DataHelper.getUniqueElementsById(
      res_allContacts,
      resume.contacts
    )) {
      await db.execute(
        this.deleteResumeContactQuery(res_resume?.[0].id, contact.id)
      );
    }
    for (const contact of resume.contacts as ContactDto[]) {
      await ContactService.saveContact(contact);
    }
    
    return this.getResume();
  }
}
