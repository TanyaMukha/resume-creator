import { CompanyType, ContactType, DegreeType, LanguageLevel } from "./enums";

export interface MigrationDto {
  id: number;
  name: string;
  description?: string;
  executed: string;
}

export interface SkillDto {
  id: number;
  title: string;
  order?: number;
  unvisible?: boolean;
}

export interface PositionDto {
  id: number;
  title: string;
  salary: number;
  summary: string;
  expectation?: string;
  unvisible?: boolean;
  resume_id: number;
  skills: SkillDto[];
}

export interface DiplomDto {
  id: number;
  start: string;
  finish: string;
  degree: DegreeType;
  specialization: string;
  unvisible?: boolean;
  education_id: number;
}

export interface EducationDto {
  id: number;
  university: string;
  unvisible?: boolean;
  resume_id: number;
  diploms: DiplomDto[];
}

export interface RoleDto {
  id: number;
  title: string;
  order?: number;
  unvisible?: boolean;
}

export interface ProjectTaskDto {
  id: number,
  description: string,
  unvisible?: boolean,
  project_id: number;
}

export interface ProjectAchievementDto {
  id: number,
  project_id: number;
  achievement: string;
}

export interface ProjectDto {
  id: number;
  title: string;
  client: string;
  description: string;
  start: string;
  finish?: string;
  unvisible?: boolean;
  experience_id: number;
  roles: RoleDto[];
  tasks: ProjectTaskDto[];
  achievements?: ProjectAchievementDto[];
  skills: SkillDto[];
}

export interface ExperienceAchievementDto {
  id: number,
  experience_id: number;
  achievement: string;
}

export interface ExperienceTaskDto {
  id: number,
  description: string,
  unvisible?: boolean,
  experience_id: number;
}

export interface ExperienceDto {
  id: number;
  company?: string;
  location?: string;
  type?: CompanyType;
  start: string;
  finish?: string;
  position: string;
  description?: string;
  unvisible?: boolean;
  resume_id: number;
  achievements?: ExperienceAchievementDto[];
  projects?: ProjectDto[];
  tasks?: ExperienceTaskDto[];
}

export interface CertificateDto {
  id: number;
  title: string;
  year: number;
  link: string;
  unvisible?: boolean;
  resume_id: number;
}

export interface LanguageDto {
  id: number;
  title: string;
  level: LanguageLevel;
  unvisible?: boolean;
  resume_id: number;
}

export interface ContactDto {
  id: number;
  type: ContactType;
  title: string;
  value: string;
  order?: number;
  unvisible?: boolean;
  resume_id: number;
}

export interface ResumeDto {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
  contacts: ContactDto[];
  languages?: LanguageDto[];
  positions: PositionDto[];
  education: EducationDto[];
  experience: ExperienceDto[];
  certificates?: CertificateDto[];
}
