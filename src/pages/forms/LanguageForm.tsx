import { FC } from "react";
import {
  TextField,
  Grid,
  IconButton,
  MenuItem,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { LanguageDto } from "../../database/models/Dto";
import { LanguageLevel } from "../../database/models/enums";

interface LanguageFormProps {
  language: LanguageDto;
  index: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onDelete: () => void;
}

export const LanguageForm: FC<LanguageFormProps> = ({
  language,
  index,
  onChange,
  onDelete,
}) => {
  return (
    <Card
      sx={{
        position: "relative",
        "&:hover": { boxShadow: 2 },
        transition: "box-shadow 0.3s ease-in-out",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Language"
              value={language.title}
              onChange={(e) =>
                onChange(`languages[${index}].title`, e.target.value)
              }
              placeholder="Enter language name"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Level"
              value={language.level}
              onChange={(e) =>
                onChange(
                  `languages[${index}].level`,
                  e.target.value as LanguageLevel
                )
              }
            >
              {Object.values(LanguageLevel).map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
            md={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tooltip title="Delete language">
              <IconButton color="error" onClick={onDelete} size="large">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
