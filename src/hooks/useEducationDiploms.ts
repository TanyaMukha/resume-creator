import { useCallback } from "react";
import { DiplomDto } from "../database/models/Dto";

export const useEducationDiploms = (
  educationIndex: number,
  education: { diploms?: DiplomDto[] },
  onChange: (field: string, arg: unknown) => void
) => {
  const handleAddDiplom = useCallback(() => {
    onChange(
      `education[${educationIndex}].diploms[${education.diploms?.length ?? 0}]`,
      {
        id: 0,
      }
    );
  }, [educationIndex, education, onChange]);

  const handleDeleteDiplom = useCallback(
    (diplomIndex: number) => {
      onChange(
        `education[${educationIndex}].diploms`,
        education.diploms?.filter((_, i) => i !== diplomIndex)
      );
    },
    [educationIndex, education, onChange]
  );

  return { handleAddDiplom, handleDeleteDiplom };
};
