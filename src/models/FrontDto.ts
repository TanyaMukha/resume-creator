import { CompanyType, ContactType, LanguageLevel } from "../constants";

export interface Skill {
  id: number;
  title: string;
  order?: number,
  unvisible?: boolean;
}

export interface Position {
  id: number;
  title: string;
  salary: number;
  summary: string;
  expectation?: string;
  relatedSkills: Skill[];
  unvisible?: boolean;
}
export interface Diplom {
  start: string;
  finish: string;
  degree: string;
  specialization: string;
  unvisible?: boolean;
}

export interface Education {
  id: number;
  university: string; // university or course
  diploms: Diplom[];
  unvisible?: boolean;
}

export interface Project {
  id: number;
  title: string;
  client: string;
  description: string;
  start: string;
  finish?: string;
  roles: string[];
  tasks: string[];
  achievements?: string[];
  skills: Skill[];
  unvisible?: boolean;
}

export interface Experience {
  id: number;
  company?: string;
  location?: string;
  type?: CompanyType;
  start: string;
  finish?: string;
  position: string;
  functions?: string[];
  description?: string;
  projects?: Project[];
  achievements?: string[];
  unvisible?: boolean;
}

export interface Certificate {
  id: number;
  title: string;
  year: number;
  link: string;
  unvisible?: boolean;
}

export interface Language {
  id: number,
  title: string,
  level: LanguageLevel,
}

export interface Contact {
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
  contacts: Contact[],
  age?: number;
  languages?: Language[],
  positions: Position[];
  expectation?: string;
  education: Education[];
  experience: Experience[];
  certificates?: Certificate[];
  unvisible?: boolean;
}
