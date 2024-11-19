import { useEffect, useState } from "react";
import { SkillDto } from "../database/models/Dto";
import { SkillService } from "../database/services/SkillService";

export const useSoftSkills = () => {
  const [softSkills, setSoftSkills] = useState<SkillDto[]>([]);

  useEffect(() => {
    SkillService.getSoftSkills().then(setSoftSkills);
  }, []);

  return softSkills;
};
