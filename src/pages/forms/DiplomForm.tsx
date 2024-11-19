import React from "react";
import {
  TextField,
  Grid,
  IconButton,
  MenuItem,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { DiplomDto } from "../../database/models/Dto";
import { DegreeType } from "../../database/models/enums";
import { DATE_FOR_PERIOD_FORMAT } from "../../helpers/constants";

interface DiplomFormProps {
  diplom: DiplomDto;
  educationIndex: number;
  diplomIndex: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onDelete: () => void;
}

export const DiplomForm: React.FC<DiplomFormProps> = ({
  diplom,
  educationIndex,
  diplomIndex,
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
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Degree"
              value={diplom.degree}
              onChange={(e) =>
                onChange(
                  `education[${educationIndex}].diploms[${diplomIndex}].degree`,
                  e.target.value
                )
              }
            >
              {Object.values(DegreeType).map((degree) => (
                <MenuItem key={degree} value={degree}>
                  {degree}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Specialization"
              value={diplom.specialization}
              onChange={(e) =>
                onChange(
                  `education[${educationIndex}].diploms[${diplomIndex}].specialization`,
                  e.target.value
                )
              }
              placeholder="Enter your specialization"
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={
                  dayjs(diplom.start, DATE_FOR_PERIOD_FORMAT).isValid()
                    ? dayjs(diplom.start, DATE_FOR_PERIOD_FORMAT)
                    : null
                }
                onChange={(e) =>
                  onChange(
                    `education[${educationIndex}].diploms[${diplomIndex}].start`,
                    e?.format(DATE_FOR_PERIOD_FORMAT)
                  )
                }
                format={DATE_FOR_PERIOD_FORMAT}
                views={["year", "month"]}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={
                  dayjs(diplom.finish, DATE_FOR_PERIOD_FORMAT).isValid()
                    ? dayjs(diplom.finish, DATE_FOR_PERIOD_FORMAT)
                    : null
                }
                onChange={(e) =>
                  onChange(
                    `education[${educationIndex}].diploms[${diplomIndex}].finish`,
                    e?.format(DATE_FOR_PERIOD_FORMAT)
                  )
                }
                format={DATE_FOR_PERIOD_FORMAT}
                views={["year", "month"]}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tooltip title="Delete diploma">
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
