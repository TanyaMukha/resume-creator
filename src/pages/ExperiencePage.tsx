import { FC } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import {
  Add as AddIcon,
  Save as SaveIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import {
  ExperienceDto,
} from "../database/models/Dto";
import { ExperienceForm } from "./forms/ExperienceForm";

interface ExperiencePageProps {
  experiences: ExperienceDto[];
  resume_id: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onSave: () => void;
}

export const ExperiencePage: FC<ExperiencePageProps> = ({
  experiences,
  resume_id,
  onChange,
  onBlur,
  onSave,
}) => {
  const handleAddExperience = () =>
    onChange(`experience[${experiences?.length}]`, {
      id: 0,
      resume_id: resume_id,
    });

  const handleDeleteExperience = (index: number) =>
    onChange(
      `experience`,
      experiences?.filter((_: ExperienceDto, i: number) => i !== index)
    );

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Work Experience
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddExperience}
          >
            Add Experience
          </Button>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={onSave}>
            Save Changes
          </Button>
        </Box>
      </Box>

      {/* Experience List */}
      {experiences
        .sort(
          (a: ExperienceDto, b: ExperienceDto) =>
            new Date(b.start).getTime() - new Date(a.start).getTime()
        )
        .map((experience: ExperienceDto, experienceIndex: number) => (
          <ExperienceForm
            key={experience.id}
            experience={experience}
            onChange={onChange}
            onDelete={() => handleDeleteExperience(experienceIndex)}
            experienceIndex={experienceIndex}
            resume_id={resume_id}
            onBlur={onBlur}
            onSave={onSave}
          />
        ))}

      {/* Empty State */}
      {(!experiences || experiences?.length === 0) && (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <WorkIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Work Experience Added Yet
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Start by adding your work experience
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddExperience}
          >
            Add Experience
          </Button>
        </Paper>
      )}
    </Box>
  );
};
