import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../Step.module.scss";
import { FormikProps } from "formik";
import { AccordionPlus } from "../../../../components/Accordion/Accordion";
import { PositionDto, SkillDto } from "../../../../database/models/Dto";
import { useEffect, useState } from "react";
import { SkillService } from "../../../../database/services/SkillService";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AddButton } from "../../../../components/Buttons/AddButton";

interface PositionsProps {
  formikValidationSchema: FormikProps<any>;
  // setDisabled: (e: boolean) => void
  step: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
}

export default function Positions(props: PositionsProps) {
  const { formikValidationSchema, step, onChange, onBlur } = props;
  const [skills, setSkills] = useState<SkillDto[]>([]);

  useEffect(() => {
    SkillService.getSkills().then((res) => {
      setSkills(res);
    });
  }, []);

  return (
    <Box className={styles.container}>
      <Stack sx={{ alignItems: "center" }}>
        <Typography variant="h2">
          Positions <AddCircleIcon />
        </Typography>
        {formikValidationSchema.values?.positions?.map(
          (item: PositionDto, index: number) => (
            <AccordionPlus
              title={item.title ?? "New position"}
              classes={{
                summary: styles.pruneTitle,
                details: styles.docAccordionDetails,
              }}
              onClickDeleteIcon={() =>
                onChange(
                  `positions`,
                  formikValidationSchema.values?.positions?.filter(
                    (_: PositionDto, i: number) => i !== index
                  )
                )
              }
              key={index}
            >
              <Stack
                className={styles.documentAccordion}
                sx={{ alignItems: "stretch" }}
              >
                <TextField
                  key="position-title"
                  label="Title"
                  value={item.title}
                  onChange={(e) =>
                    onChange(`positions[${index}].title`, e.target.value)
                  }
                  variant="standard"
                  required
                  focused={(item.title?.length ?? 0) > 0}
                />
                <TextField
                  key="position-salary"
                  label="Salary"
                  value={item.salary}
                  onChange={(e) =>
                    onChange(`positions[${index}].salary`, e.target.value)
                  }
                  variant="standard"
                  focused={(item.salary ?? 0) > 0}
                />
                <TextField
                  key="position-summary"
                  label="Summary"
                  value={item.summary}
                  onChange={(e) =>
                    onChange(`positions[${index}].summary`, e.target.value)
                  }
                  variant="standard"
                  required
                  focused={(item.summary?.length ?? 0) > 0}
                  multiline
                />
                <TextField
                  key="position-expectation"
                  label="Expectation"
                  value={item.expectation}
                  onChange={(e) =>
                    onChange(`positions[${index}].expectation`, e.target.value)
                  }
                  variant="standard"
                  // required
                  focused={(item.expectation?.length ?? 0) > 0}
                />
                <Typography variant="h3">Skills</Typography>
                <Autocomplete
                  multiple
                  value={item.skills}
                  onChange={(e, newValue) => {
                    console.log(newValue)
                    onChange(`positions[${index}].skills`, newValue);
                  }}
                  options={skills}
                  getOptionLabel={(option) => option.title}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skills"
                      placeholder="Choose skill"
                    />
                  )}
                />
              </Stack>
            </AccordionPlus>
          )
        )}
        <AddButton title="Add position" />
      </Stack>
    </Box>
  );
}
