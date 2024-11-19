import { FC } from "react";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import { Add as AddIcon, School as SchoolIcon } from "@mui/icons-material";
import { CertificateForm } from "../forms/CertificateForm";
import { CertificateDto } from "../../database/models/Dto";

interface CertificatesSectionProps {
  certificates: CertificateDto[];
  resume_id: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
}

export const CertificatesSection: FC<CertificatesSectionProps> = ({
  certificates,
  resume_id,
  onChange,
  onBlur,
}) => {
  const handleAddCertificate = () =>
    onChange(`certificates[${certificates?.length ?? 0}]`, {
      id: 0,
      resume_id: resume_id,
    });

  const handleDeleteCertificate = (index: number) =>
    onChange(
      `certificates`,
      certificates?.filter((_: CertificateDto, i: number) => i !== index)
    );

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SchoolIcon color="primary" />
          <Typography variant="h6">Certifications & Courses</Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddCertificate}
        >
          Add Certificate
        </Button>
      </Box>

      <Stack spacing={2}>
        {certificates.map((certificate, index) => (
          <CertificateForm
            key={certificate.id}
            certificate={certificate}
            index={index}
            onChange={onChange}
            onBlur={onBlur}
            onDelete={() => handleDeleteCertificate(index)}
          />
        ))}
        {certificates.length === 0 && (
          <Typography color="text.secondary" align="center" py={2}>
            No certificates added yet. Click "Add Certificate" to start.
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};
