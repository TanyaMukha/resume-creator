import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import { PositionDto, SkillDto } from "../../database/models/Dto";
import { usePositionSkills } from "../../hooks/usePositionSkills";
import { useHardSkills } from "../../hooks/useHardSkills";

interface PositionFormProps {
  position?: PositionDto;
  positionIndex: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onSave: (position: PositionDto) => void;
  onDelete: () => void;
  onClose: () => void;
  mode: "create" | "edit";
}

export const PositionForm: React.FC<PositionFormProps> = ({
  position,
  positionIndex,
  onChange,
  onSave,
  onDelete,
  onClose,
  mode,
}) => {
  const [draftPosition, setDraftPosition] = useState<PositionDto>(
    position ? { ...position } : ({} as PositionDto)
  );
  const [isLoading, setIsLoading] = useState(false);

  const hardSkills = useHardSkills();

  const { handleGetNewPositionSkills } = usePositionSkills(
    positionIndex,
    hardSkills,
    position ?? ({} as PositionDto),
    onChange
  );

  const handleFieldChange = (field: keyof PositionDto, value: any) => {
    setDraftPosition((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillsChange = (newSkills: (SkillDto | string)[]) => {
    setDraftPosition((prev) => ({
      ...prev,
      skills: handleGetNewPositionSkills(newSkills),
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    try {
      onSave(draftPosition);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(draftPosition);
  }, [draftPosition]);

  return (
    <Box sx={{ p: 3, maxWidth: 900, margin: "0 auto" }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {mode === "create" ? "Create New Position" : "Edit Position"}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Position Title"
              value={draftPosition?.title || ""}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              placeholder="e.g., Senior Frontend Developer"
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Salary"
              value={draftPosition?.salary || ""}
              onChange={(e) =>
                handleFieldChange("salary", Number(e.target.value))
              }
              type="number"
              InputProps={{
                startAdornment: "$",
              }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Professional Summary"
              value={draftPosition?.summary || ""}
              onChange={(e) => handleFieldChange("summary", e.target.value)}
              placeholder="Describe the position and your main responsibilities"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Career Objective"
              value={draftPosition?.objective || ""}
              onChange={(e) => handleFieldChange("objective", e.target.value)}
              placeholder="What are your objectives?"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Skills
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Autocomplete
                multiple
                options={hardSkills}
                value={draftPosition?.hard_skills || []}
                onChange={(_, newValue) => handleSkillsChange(newValue)}
                getOptionLabel={(option) => (option as SkillDto).title}
                isOptionEqualToValue={(option, value) =>
                  (option as SkillDto).title === value.title
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skills"
                    placeholder="Add skills"
                  />
                )}
                freeSolo
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => onSave(draftPosition)}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
