import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import styles from "../Step.module.scss";
import { FormikProps } from "formik";
import { AccordionPlus } from "../../../../components/Accordion/Accordion";
import { PositionDto, SkillDto } from "../../../../database/models/Dto";
import { useEffect, useState } from "react";
import { SkillService } from "../../../../database/services/SkillService";
import { AddButton } from "../../../../components/Buttons/AddButton";
import { ParagraphTitlePlusOne } from "../../../../components/ParagraphTitlePlusOne/ParagraphTitlePlusOne";

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

  const handleAddPosition = () => {
    onChange(`positions[${formikValidationSchema.values.positions?.length}]`, {
      id: 0,
    });
  };

  return (
    <Box className={styles.container}>
      <Stack sx={{ alignItems: "center" }}>
        <ParagraphTitlePlusOne
          title={"Positions"}
          hideIcon={false}
          onClick={handleAddPosition}
        />
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
                  value={item.skills ?? []}
                  onChange={(e, newValue) => {
                    console.log(newValue);
                    if (newValue.length > 0) {
                      if (typeof newValue[newValue.length - 1] === "string") {
                        if (
                          skills.find(
                            (i) => i.title === newValue[newValue.length - 1]
                          )
                        ) {
                          onChange(`positions[${index}].skills`, [
                            ...newValue.length > 1 ? newValue.slice(0, -1) : [],
                            skills.find(
                              (i) => i.title === newValue[newValue.length - 1]
                            ),
                          ]);
                          return;
                        } else {
                          if (
                            !item.skills.find(
                              (i) => i.title === newValue[newValue.length - 1]
                            )
                          )
                            onChange(`positions[${index}].skills`, [
                              ...newValue.length > 1 ? newValue.slice(0, -1) : [],
                              { id: 0, title: newValue[newValue.length - 1] },
                            ]);
                          return;
                        }
                      }
                    }
                    onChange(`positions[${index}].skills`, newValue);
                  }}
                  options={skills}
                  getOptionLabel={(option) => (option as SkillDto).title}
                  isOptionEqualToValue={(option, value) =>
                    (option as SkillDto).title === value.title
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skills"
                      placeholder="Choose skill or Input + Enter"
                    />
                  )}
                  freeSolo
                />
              </Stack>
            </AccordionPlus>
          )
        )}
        <AddButton title="Add position" onClick={handleAddPosition} />
      </Stack>
    </Box>
  );
}
