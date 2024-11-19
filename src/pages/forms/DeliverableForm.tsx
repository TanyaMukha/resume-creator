import { ChangeEvent, FC } from "react";
import { Box, TextField, IconButton, Tooltip } from "@mui/material";
import {
  Delete as DeleteIcon,
  EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material";
import {
  ExperienceDeliverableDto,
  ProjectDeliverableDto,
} from "../../database/models/Dto";

interface DeliverableFormProps {
  deliverable: ExperienceDeliverableDto | ProjectDeliverableDto;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

export const DeliverableForm: FC<DeliverableFormProps> = ({
  deliverable,
  onChange,
  onDelete,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <EmojiEventsIcon color="action" sx={{ fontSize: 20 }} />
      <TextField
        fullWidth
        size="small"
        value={deliverable.deliverable}
        onChange={onChange}
        placeholder="Enter deliverable description"
      />
      <Tooltip title="Delete deliverable">
        <IconButton size="small" color="error" onClick={onDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
