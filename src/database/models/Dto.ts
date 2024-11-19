import { ContactType, DegreeType, LanguageLevel } from "./enums";

export interface MigrationDto {
  id: number;
  name: string;
  description?: string;
  executed: string;
}

export interface SkillGroupDto {
  id: number;
  title: string;
}

export interface SkillDto {
  id: number;
  title: string;
  resume_id?: number;
  group_id?: number;
  display_order?: number;
  type: number;
}

export interface PositionDto {
  id: number;
  title: string;
  salary?: number;
  summary?: string;
  objective?: string;
  resume_id: number;
  hard_skills: SkillDto[];
}

export interface DiplomDto {
  id: number;
  start: string;
  finish: string;
  degree: DegreeType;
  specialization: string;
  education_id: number;
}

export interface EducationDto {
  id: number;
  university: string;
  resume_id: number;
  diploms: DiplomDto[];
}

export interface ProjectDeliverableDto {
  id: number;
  project_id: number;
  deliverable: string;
}

export interface ProjectDto {
  id: number;
  title: string;
  client: string;
  description: string;
  start: string;
  finish?: string;
  experience_id: number;
  deliverables?: ProjectDeliverableDto[];
  deliverables_title?: string;
  hard_skills: SkillDto[];
  key_project: boolean;
}

export interface ExperienceDeliverableDto {
  id: number;
  experience_id: number;
  deliverable: string;
}

export interface ExperienceDto {
  id: number;
  company?: string;
  location?: string;
  start: string;
  finish?: string;
  position: string;
  description?: string;
  resume_id: number;
  deliverables?: ExperienceDeliverableDto[];
  deliverables_title?: string;
  projects?: ProjectDto[];
  hard_skills: SkillDto[];
}

export interface CertificateDto {
  id: number;
  title: string;
  start: number;
  link: string;
  issuer?: string; // Организация, выдавшая сертификат
  credentialId?: string; // Уникальный идентификатор сертификата
  finish?: number; // Год истечения (если есть)
  type?: "certification" | "course" | "diploma" | "other"; // Тип сертификата
  resume_id: number;
}

export interface LanguageDto {
  id: number;
  title: string;
  level: LanguageLevel;
  resume_id: number;
}

export interface ContactDto {
  id: number;
  type: ContactType;
  title: string;
  value: string;
  display_order?: number;
  resume_id: number;
}

export interface GrowthHighlightDto {
  id: number;
  resume_id: number;
  highlight_text: string;
  display_order: number;
  created_at: string;
}

export interface ReferenceDto {
  id: number;
  name_prefix?: "Mr" | "Mrs" | "Ms";
  name: string;
  position?: string;
  company?: string;
  email?: string;
  skype?: string;
  phone?: string;
  resume_id: number;
}

export interface ResumeDto {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  age?: number;
  contacts: ContactDto[];
  languages?: LanguageDto[];
  positions: PositionDto[];
  education: EducationDto[];
  experience: ExperienceDto[];
  certificates?: CertificateDto[];
  growth_highlights?: GrowthHighlightDto[];
  soft_skills: SkillDto[];
  references: ReferenceDto[];
}
