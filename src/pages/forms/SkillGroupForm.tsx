import { FC, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Autocomplete,
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";
import { Check as SaveIcon, Close as CancelIcon } from "@mui/icons-material";
import { SkillDto, SkillGroupDto } from "../../database/models/Dto";

interface GroupFormProps {
  group?: SkillGroupDto;
  skills: SkillDto[];
  onSave: () => void;
  onCancel: () => void;
}

export const GroupForm: FC<GroupFormProps> = ({ group, skills, onCancel }) => {
  const [title, setTitle] = useState(group?.title || "");
  const [selectedSkills, setSelectedSkills] = useState<SkillDto[]>(
    skills.filter((i) => i.group_id === group?.id)
  );

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          fullWidth
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter group title"
          label="Group Title"
        />
        <Tooltip title="Save">
          <IconButton onClick={() => {}} disabled={!title.trim()}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel">
          <IconButton onClick={onCancel}>
            <CancelIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Autocomplete
        multiple
        options={skills}
        value={selectedSkills}
        onChange={(_, newValue) => setSelectedSkills(newValue)}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Skills"
            placeholder="Select skills"
            size="small"
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option.title}
              {...getTagProps({ index })}
              size="small"
            />
          ))
        }
      />
    </Stack>
  );
};
