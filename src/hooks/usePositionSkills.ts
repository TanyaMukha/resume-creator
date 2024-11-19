import { useCallback } from "react";
import { PositionDto, SkillDto } from "../database/models/Dto";
import { prepareObjectSet } from "../helpers/prepareObjectSet";

export const usePositionSkills = (
  positionIndex: number,
  skills: SkillDto[],
  position: PositionDto,
  onChange: (field: string, value: unknown) => void
) => {
  const handleGetNewPositionSkills = (
    newValue: (SkillDto | string)[]
  ): SkillDto[] => {
    return prepareObjectSet(position?.hard_skills, newValue, skills);
  };

  const handleChangePositionSkills = useCallback(
    (newValue: (SkillDto | string)[]) => {
      const updatedSkills = prepareObjectSet(
        position?.hard_skills,
        newValue,
        skills
      );

      onChange(`positions[${positionIndex}].skills`, updatedSkills);
    },
    [positionIndex, skills, position, onChange]
  );

  return {
    handleGetNewPositionSkills,
    handleChangePositionSkills,
  };
};
