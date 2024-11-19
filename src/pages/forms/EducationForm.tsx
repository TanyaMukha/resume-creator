import { FC } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import { EducationDto } from "../../database/models/Dto";

import { DiplomForm } from "./DiplomForm";
import { useEducationDiploms } from "../../hooks/useEducationDiploms";

interface EducationFormProps {
  education: EducationDto;
  educationIndex: number;
  resume_id: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onSave: () => void;
  onDelete: () => void;
}

export const EducationForm: FC<EducationFormProps> = ({
  education,
  educationIndex,
  onChange,
  onBlur,
  onDelete,
}) => {
  const { handleAddDiplom, handleDeleteDiplom } = useEducationDiploms(
    educationIndex,
    education,
    onChange
  );

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <SchoolIcon color="primary" />
        <TextField
          fullWidth
          label="University"
          value={education.university}
          onChange={(e) =>
            onChange(`education[${educationIndex}].university`, e.target.value)
          }
          placeholder="Enter university name"
        />
        <Tooltip title="Delete education">
          <IconButton color="error" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="subtitle1">Diplomas & Degrees</Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddDiplom}
          size="small"
        >
          Add Diploma
        </Button>
      </Box>

      <Stack spacing={2}>
        {education.diploms
          .map((diplom, diplomIndex) => (
            <DiplomForm
              key={diplom.id}
              diplom={diplom}
              educationIndex={educationIndex}
              diplomIndex={diplomIndex}
              onChange={onChange}
              onDelete={() => handleDeleteDiplom(diplomIndex)}
              onBlur={onBlur}
            />
          ))}
        {(!education.diploms || education.diploms?.length === 0) && (
          <Typography color="text.secondary" align="center" py={2}>
            No diplomas added yet. Click "Add Diploma" to start.
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};
