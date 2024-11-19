import { useState, useCallback } from "react";
import { ProjectDto, SkillDto } from "../database/models/Dto";
import { prepareObjectSet } from "../helpers/prepareObjectSet";

export const useProjectSkills = (
  experienceIndex: number,
  projectIndex: number,
  skills: SkillDto[],
  project: ProjectDto,
  onChange: (field: string, value: unknown) => void
) => {
  const [updatedSkills, setUpdatedSkills] = useState<SkillDto[]>([]);

  const handleChangeProjectSkills = useCallback(
    (newValue: (SkillDto | string)[]) => {
      const updatedSkills = prepareObjectSet(
        project.hard_skills,
        newValue,
        skills
      );

      setUpdatedSkills(updatedSkills);

      onChange(
        `experience[${experienceIndex}].projects[${projectIndex}].skills`,
        updatedSkills
      );
    },
    [experienceIndex, projectIndex, skills, project, onChange]
  );

  return {
    updatedSkills,
    handleChangeProjectSkills
  };
};
