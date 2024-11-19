import { ProjectDto, ProjectDeliverableDto } from "../database/models/Dto";

export const useProjectDeliverables = (
  project: ProjectDto,
  projectIndex: number,
  experienceIndex: number,
  onChange: (field: string, arg: unknown) => void
) => {
  const handleAddProjectDeliverable = () => {
    const deliverableKey = `experience[${experienceIndex}].projects[${projectIndex}].deliverables[${
      project.deliverables?.length ?? 0
    }]`;
    const newDeliverable = {
      id: 0,
      project_id: project.id,
    };

    onChange(deliverableKey, newDeliverable);
  };

  const handleDeleteProjectDeliverable = (deliverableIndex: number) => {
    const updatedDeliverables = project?.deliverables?.filter(
      (_: ProjectDeliverableDto, i: number) => i !== deliverableIndex
    );
    const deliverablesKey = `experience[${experienceIndex}].projects[${projectIndex}].deliverables`;

    onChange(deliverablesKey, updatedDeliverables);
  };

  return {
    handleAddProjectDeliverable,
    handleDeleteProjectDeliverable,
  };
};