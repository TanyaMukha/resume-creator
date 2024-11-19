import { FC } from "react";
import { Paper, Typography, Button } from "@mui/material";
import {
  Add as AddIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import { CertificateDto, EducationDto } from "../../database/models/Dto";
import { EducationForm } from "../forms/EducationForm";

interface UniversitiesSectionProps {
  educations: EducationDto[];
  certificates?: CertificateDto[];
  resume_id: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onAdd: () => void;
}

export const UniversitiesSection: FC<UniversitiesSectionProps> = ({
  educations,
  resume_id,
  onChange,
  onAdd,
}) => {

  const handleDeleteUniversity = (index: number) =>
    onChange(
      `education`,
      educations?.filter((_: EducationDto, i: number) => i !== index)
    );

  return (
    <>
      {/* Education List */}
      {educations
        ?.filter((education: EducationDto) => !education.unvisible)
        .map((education: EducationDto, index) => (
          <EducationForm
            key={education.id}
            education={education}
            onChange={onChange}
            onDelete={() => handleDeleteUniversity(index)}
            educationIndex={index}
            resume_id={resume_id}
            onBlur={() => {}}
            onSave={() => {}}
          />
        ))}

      {/* Empty State */}
      {educations?.length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <SchoolIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Education Added Yet
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Start by adding your educational background
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
          >
            Add Education
          </Button>
        </Paper>
      )}
    </>
  );
};
