import { useState, useCallback } from "react";
import { ExperienceDto, SkillDto } from "../database/models/Dto";
import { prepareObjectSet } from "../helpers/prepareObjectSet";

export const useExperienceSkills = (
  experienceIndex: number,
  experience: ExperienceDto,
  skills: SkillDto[],
  onChange: (field: string, value: unknown) => void
) => {
  const [updatedSkills, setUpdatedSkills] = useState<SkillDto[]>([]);

  const handleChangeExperienceSkills = useCallback(
    (newValue: (SkillDto | string)[]) => {
      const updatedSkills = prepareObjectSet(
        experience.hard_skills,
        newValue,
        skills
      );

      setUpdatedSkills(updatedSkills);

      onChange(
        `experience[${experienceIndex}].hard_skills`,
        updatedSkills
      );
    },
    [experienceIndex, skills, experience, onChange]
  );

  return {
    updatedSkills,
    handleChangeExperienceSkills
  };
};
