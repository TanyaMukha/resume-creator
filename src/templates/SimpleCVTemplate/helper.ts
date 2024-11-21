import { ProjectDto, SkillDto, SkillGroupDto } from "../../database/models/Dto";

export const getYearRange = (projects: ProjectDto[]) => {
  if (!projects.length) return "";

  const years = projects
    .map((p) => {
      const startYear = parseInt(p.start.split(".")[1]);
      const finishYear = p.finish
        ? parseInt(p.finish.split(".")[1])
        : new Date().getFullYear();
      return [startYear, finishYear];
    })
    .flat();

  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  return minYear === maxYear ? minYear : `${minYear}-${maxYear}`;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getSkillsByGroup = (groups: SkillGroupDto[], skills: SkillDto[]) => {
  const groupedSkills: { [key: string]: SkillDto[] } = {
    Other: [],
  };

  groups.forEach((group) => {
    groupedSkills[group.title] = [];
  });

  skills?.forEach((skill) => {
    const group = groups.find((g) => g.id === skill.group_id);
    if (group) {
      groupedSkills[group.title].push(skill);
    } else {
      groupedSkills.Other.push(skill);
    }
  });

  Object.keys(groupedSkills).forEach((key) => {
    if (groupedSkills[key].length === 0 && key !== "Other") {
      delete groupedSkills[key];
    }
  });

  if (groupedSkills.Other.length === 0) {
    delete groupedSkills.Other;
  }

  return groupedSkills;
};
