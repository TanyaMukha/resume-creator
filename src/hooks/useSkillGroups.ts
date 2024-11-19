import { useEffect, useState } from "react";
import { SkillGroupDto } from "../database/models/Dto";
import { SkillGroupService } from "../database/services/SkillGroupService";

export const useSkillGroups = () => {
  const [skillGroups, setSkillGroups] = useState<SkillGroupDto[]>([]);

  useEffect(() => {
    SkillGroupService.getSkillGroups().then(setSkillGroups);
  }, []);

  return skillGroups;
};
