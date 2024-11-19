import { useEffect, useState } from "react";
import { SkillDto } from "../database/models/Dto";
import { SkillService } from "../database/services/SkillService";

export const useHardSkills = () => {
  const [hardSkills, setHardSkills] = useState<SkillDto[]>([]);

  useEffect(() => {
    SkillService.getHardSkills().then(setHardSkills);
  }, []);

  return hardSkills;
};
