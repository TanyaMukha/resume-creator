import { useEffect, useState } from "react";
import { SkillDto } from "../database/models/Dto";
import { SkillService } from "../database/services/SkillService";

export const useSkills = () => {
  const [skills, setSkills] = useState<SkillDto[]>([]);

  useEffect(() => {
    SkillService.getSkills().then(setSkills);
  }, []);

  return skills;
};
