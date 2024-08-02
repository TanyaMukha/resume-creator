import { CompanyType } from "../constants";

interface Skill {
  id: number;
  title: string;
  unvisible?: boolean;
}

interface Position {
  id: number;
  title: string;
  relatedSkills: Skill[];
  unvisible?: boolean;
}

interface Education {
  id: number;
  title: string; // university or course
  start: string;
  finish: string;
  specialization: string;
  grade: string;
  unvisible?: boolean;
}

interface Project {
  id: number;
  title: string;
  client: string;
  description: string;
  start: string;
  finish: string;
  roles: string[];
  tasks: string[];
  achievements?: string[];
  skills: Skill[];
  unvisible?: boolean;
}

interface Experience {
  id: number;
  company?: string;
  type?: CompanyType;
  start: string;
  finish: string;
  position: string;
  projects?: Project[];
  unvisible?: boolean;
}

interface Certificate {
  id: number;
  title: string;
  year: number;
  link: string;
  unvisible?: boolean;
}

export interface ResumeFrontDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  phone?: string;
  skype?: string;
  telegram?: string;
  whatsApp?: string;
  age?: number;
  positions: Position[];
  introduction: string;
  expectation?: string;
  education: Education[];
  experience: Experience[];
  certificates?: Certificate[];
  unvisible?: boolean;
}
