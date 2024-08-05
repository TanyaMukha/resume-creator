export interface MigrationDto {
  id: number;
  name: string;
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
}

export interface DiplomDto {
  id: number;
  education_id: number;
  start: string;
  finish: string;
  degree: string;
  specialization: string;
  unvisible?: boolean;
}

export interface EducationDto {
  id: number;
  university: string;
  unvisible?: boolean;
}

export interface TaskDto {
  id: number;
  description: string;
  unvisible?: boolean;
}

export interface ProjectDto {
  id: number;
  title: string;
  client: string;
  description: string;
  start: string;
  finish?: string;
  unvisible?: boolean;
}

export interface ExperienceDto {
  id: number;
  company?: string;
  location?: string;
  type?: string;
  start: string;
  finish?: string;
  position: string;
  description?: string;
  unvisible?: boolean;
}

export interface CertificateDto {
  id: number;
  title: string;
  year: number;
  link: string;
  unvisible?: boolean;
}

export interface LanguageDto {
  id: number;
  title: string;
  level: string;
  unvisible?: boolean;
}

export interface ContactDto {
  id: number;
  type: string;
  title: string;
  value: string;
  order?: number;
  unvisible?: boolean;
}

export interface ResumeDto {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
  expectation?: string;
  unvisible?: boolean;
}

export interface PositionSkillDto {
  position_id: number;
  skill_id: number;
}

export interface ProjectRoleDto {
  project_id: number;
  role: string;
}

export interface ProjectTaskDto {
  project_id: number;
  task_id: number;
}

export interface ProjectAchievementDto {
  project_id: number;
  achievement: string;
}

export interface ProjectSkillDto {
  project_id: number;
  skill_id: number;
}

export interface ExperienceProjectDto {
  experience_id: number;
  project_id: number;
}

export interface ExperienceTaskDto {
  experience_id: number;
  task_id: number;
}

export interface ResumePositionDto {
  resume_id: number;
  position_id: number;
}

export interface ResumeEducationDto {
  resume_id: number;
  education_id: number;
}

export interface ResumeExperienceDto {
  resume_id: number;
  experience_id: number;
}

export interface ResumeCertificateDto {
  resume_id: number;
  certificate_id: number;
}

export interface ResumeLanguageDto {
  resume_id: number;
  language_id: number;
}

export interface ResumeContactDto {
  resume_id: number;
  contact_id: number;
}
