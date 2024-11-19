import { ExperienceDeliverableDto, ExperienceDto } from "../database/models/Dto";

export const useExperienceDeliverables = (
  experience: ExperienceDto,
  experienceIndex: number,
  onChange: (field: string, arg: unknown) => void
) => {
  const handleAddDeliverable = () =>
    onChange(
      `experience[${experienceIndex}].deliverables[${
        experience?.deliverables?.length ?? 0
      }]`,
      { id: 0, deliverable: undefined }
    );

  const handleDeleteDeliverable = (deliverableIndex: number) =>
    onChange(
      `experience[${experienceIndex}].deliverables`,
      experience.deliverables?.filter(
        (_: ExperienceDeliverableDto, i: number) => i !== deliverableIndex
      )
    );

  return { handleAddDeliverable, handleDeleteDeliverable };
};