import { useEffect, useState } from "react";
import { ResumeDto } from "../database/models/Dto";
import { ResumeService } from "../database/services/ResumeService";

export const useResume = () => {
  const [resume, setResume] = useState<ResumeDto>();

  useEffect(() => {
    ResumeService.getResume().then(setResume);
  }, []);

  return resume;
};
