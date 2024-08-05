import { CompanyType, ContactType, LanguageLevel } from "../constants";

export interface SkillFrontDto {
  id: number;
  title: string;
  order?: number,
  unvisible?: boolean;
}

export interface PositionFrontDto {
  id: number;
  title: string;
  salary: number;
  summary: string;
  expectation?: string;
  relatedSkills: SkillFrontDto[];
  unvisible?: boolean;
}
export interface DiplomFrontDto {
  start: string;
  finish: string;
  degree: string;
  specialization: string;
  unvisible?: boolean;
}

export interface EducationFrontDto {
  id: number;
  university: string;
  diploms: DiplomFrontDto[];
  unvisible?: boolean;
}

export interface TaskFrontDto {
  id: number;
  description: string;
  unvisible?: boolean;
}

export interface ProjectFrontDto {
  id: number;
  title: string;
  client: string;
  description: string;
  start: string;
  finish?: string;
  roles: string[];
  tasks: TaskFrontDto[];
  achievements?: string[];
  skills: SkillFrontDto[];
  unvisible?: boolean;
}

export interface ExperienceFrontDto {
  id: number;
  company?: string;
  location?: string;
  type?: CompanyType;
  start: string;
  finish?: string;
  position: string;
  functions?: string[];
  description?: string;
  projects?: ProjectFrontDto[];
  tasks?: TaskFrontDto[];
  unvisible?: boolean;
}

export interface CertificateFrontDto {
  id: number;
  title: string;
  year: number;
  link: string;
  unvisible?: boolean;
}

export interface LanguageFrontDto {
  id: number,
  title: string,
  level: LanguageLevel,
  unvisible?: boolean;
}

export interface ContactFrontDto {
  id: number,
  type: ContactType,
  title: string,
  value: string,
  order?: number,
  unvisible?: boolean,
}

export interface ResumeFrontDto {
  id: number;
  firstName: string;
  lastName: string;
  contacts: ContactFrontDto[],
  age?: number;
  languages?: LanguageFrontDto[],
  positions: PositionFrontDto[];
  expectation?: string;
  education: EducationFrontDto[];
  experience: ExperienceFrontDto[];
  certificates?: CertificateFrontDto[];
  unvisible?: boolean;
}
