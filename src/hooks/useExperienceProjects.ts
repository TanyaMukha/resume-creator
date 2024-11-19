import { ExperienceDto, ProjectDto } from "../database/models/Dto";

export const useExperienceProjects = (
  experience: ExperienceDto,
  experienceIndex: number,
  onChange: (field: string, arg: unknown) => void
) => {
  const handleAddProject = () =>
    onChange(
      `experience[${experienceIndex}].projects[${
        experience?.projects?.length ?? 0
      }]`,
      { id: 0 }
    );

  const handleDeleteProject = (projectIndex: number) =>
    onChange(
      `experience[${experienceIndex}].projects`,
      experience.projects?.filter(
        (_: ProjectDto, i: number) => i !== projectIndex
      )
    );

  return { handleAddProject, handleDeleteProject };
};
