import { FC } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Add as AddIcon, Save as SaveIcon } from "@mui/icons-material";
import { CertificateDto, EducationDto } from "../database/models/Dto";
import { CertificatesSection } from "./components/CertificatesSection";
import { UniversitiesSection } from "./components/UniversitiesSection";

interface EducationPageProps {
  educations: EducationDto[];
  certificates?: CertificateDto[];
  resume_id: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onSave: () => void;
}

export const EducationPage: FC<EducationPageProps> = ({
  educations,
  certificates,
  resume_id,
  onChange,
  onBlur,
  onSave,
}) => {
  const handleAddUniversity = () => {
    onChange(`education[${educations?.length}]`, {
      id: 0,
      resume_id: resume_id,
    });
  };

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
          Education
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddUniversity}
          >
            Add Education
          </Button>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={onSave}>
            Save Changes
          </Button>
        </Box>
      </Box>

      <UniversitiesSection
        educations={educations}
        resume_id={resume_id}
        onChange={onChange}
        onBlur={onBlur}
        onAdd={handleAddUniversity}
      />

      <CertificatesSection
        certificates={certificates ?? []}
        resume_id={resume_id}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Box>
  );
};
