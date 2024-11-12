import { CompanyType, ContactType, DegreeType, LanguageLevel } from "./enums";

export interface Migration {
  id: number;
  name: string;
  description?: string;
  executed: string;
}

export interface Skill {
  id: number;
  title: string;
  order?: number;
  unvisible?: boolean;
}

export interface Position {
  id: number;
  title: string;
  salary: number;
  summary: string;
  expectation?: string;
  unvisible?: boolean;
  resume_id: number;
  skills: Skill[];
}

export interface Diplom {
  id: number;
  start: string;
  finish: string;
  degree: DegreeType;
  specialization: string;
  unvisible?: boolean;
  education_id: number;
}

export interface Education {
  id: number;
  university: string;
  unvisible?: boolean;
  resume_id: number;
  diploms: Diplom[];
}

export interface Role {
  id: number;
  title: string;
  order?: number;
  unvisible?: boolean;
}

export interface ProjectTask {
  id: number,
  description: string,
  unvisible?: boolean,
  project_id: number;
}

export interface ProjectAchievement {
  id: number,
  project_id: number;
  achievement: string;
}

export interface Project {
  id: number;
  title: string;
  client: string;
  description: string;
  start: string;
  finish?: string;
  unvisible?: boolean;
  experience_id: number;
  roles: Role[];
  tasks: ProjectTask[];
  achievements?: ProjectAchievement[];
  skills: Skill[];
}

export interface ExperienceAchievement {
  id: number,
  experience_id: number;
  achievement: string;
}

export interface ExperienceTask {
  id: number,
  description: string,
  unvisible?: boolean,
  experience_id: number;
}

export interface Experience {
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
  achievements?: ExperienceAchievement[];
  projects?: Project[];
  tasks?: ExperienceTask[];
}

export interface Certificate {
  id: number;
  title: string;
  year: number;
  link: string;
  unvisible?: boolean;
  resume_id: number;
}

export interface Language {
  id: number;
  title: string;
  level: LanguageLevel;
  unvisible?: boolean;
  resume_id: number;
}

export interface Contact {
  id: number;
  type: ContactType;
  title: string;
  value: string;
  order?: number;
  unvisible?: boolean;
  resume_id: number;
}

export interface Resume {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
  contacts: Contact[];
  languages?: Language[];
  positions: Position[];
  education: Education[];
  experience: Experience[];
  certificates?: Certificate[];
}