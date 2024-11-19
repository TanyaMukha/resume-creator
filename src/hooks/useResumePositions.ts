import { useCallback } from "react";
import { PositionDto } from "../database/models/Dto";

interface UseResumePositionsProps {
  positions: PositionDto[];
  onChange: (field: string, value: unknown) => void;
}

export const useResumePositions = ({
  positions,
  onChange,
}: UseResumePositionsProps) => {
  const handleAddPosition = useCallback(() => {
    const newPositionIndex = positions.length;
    onChange(`positions[${newPositionIndex}]`, { id: 0 });
  }, [positions, onChange]);

  const handleDeletePosition = useCallback(
    (index: number) => {
      const updatedPositions = positions.filter((_, i) => i !== index);
      onChange("positions", updatedPositions);
    },
    [positions, onChange]
  );

  const handleUpdatePosition = useCallback(
    (draftPosition: PositionDto, index: number) => {
      onChange(`positions[${index}]`, draftPosition);
    },
    [positions, onChange]
  );

  return {
    handleAddPosition,
    handleDeletePosition,
    handleUpdatePosition,
  };
};
