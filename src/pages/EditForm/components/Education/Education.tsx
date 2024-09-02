import { Box, Stack, TextField, Typography } from "@mui/material";
import styles from "../Step.module.scss";
import { FormikProps } from "formik";
import { AccordionPlus } from "../../../../components/Accordion/Accordion";
import { DiplomDto, EducationDto } from "../../../../database/models/Dto";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface EducationProps {
  formikValidationSchema: FormikProps<any>;
  // setDisabled: (e: boolean) => void
  step: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
}

export default function Education(props: EducationProps) {
  const { formikValidationSchema, step, onChange, onBlur } = props;

  return (
    <Box className={styles.container}>
      <Stack sx={{ alignItems: "center" }}>
        <Typography variant="h2">
          Education <AddCircleIcon />
        </Typography>
        {formikValidationSchema?.values?.education?.map(
          (educationItem: EducationDto, educationIndex: number) => (
            <AccordionPlus
              title={educationItem.university ?? "New university"}
              classes={{
                summary: styles.pruneTitle,
                details: styles.docAccordionDetails,
              }}
              onClickDeleteIcon={() =>
                onChange(
                  `education`,
                  formikValidationSchema?.values?.education?.filter(
                    (_: EducationDto, i: number) => i !== educationIndex
                  )
                )
              }
              key={educationIndex}
            >
              <Stack
                className={styles.documentAccordion}
                sx={{ alignItems: "stretch" }}
              >
                <TextField
                  key="education-university"
                  label="University"
                  value={educationItem.university}
                  onChange={(e) =>
                    onChange(
                      `education[${educationIndex}].university`,
                      e.target.value
                    )
                  }
                  variant="standard"
                  required
                  focused={(educationItem.university?.length ?? 0) > 0}
                  sx={{ marginBottom: "16px" }}
                />
                {educationItem.diploms.map((diplomItem, diplomIndex) => (
                  <AccordionPlus
                    title={`${diplomItem.degree} degree` ?? "New diplom"}
                    classes={{
                      summary: styles.pruneTitle,
                      details: styles.docAccordionDetails,
                    }}
                    onClickDeleteIcon={() =>
                      onChange(
                        `education[${educationIndex}].diploms`,
                        educationItem.diploms?.filter(
                          (_: DiplomDto, i: number) => i !== diplomIndex
                        )
                      )
                    }
                    key={diplomIndex}
                  >
                    <Stack
                      className={styles.documentAccordion}
                      sx={{ alignItems: "stretch" }}
                    >
                      <Stack direction="row" spacing={2}>
                        <TextField
                          key="experience-diplom-start"
                          label="Start"
                          value={diplomItem.start}
                          onChange={(e) =>
                            onChange(
                              `education[${educationIndex}].diploms[${diplomIndex}].start`,
                              e.target.value
                            )
                          }
                          variant="standard"
                          required
                          focused={(diplomItem.start?.length ?? 0) > 0}
                        />
                        <TextField
                          key="experience-diplom-finish"
                          label="Finish"
                          value={diplomItem.finish}
                          onChange={(e) =>
                            onChange(
                              `education[${educationIndex}].diploms[${diplomIndex}].finish`,
                              e.target.value
                            )
                          }
                          variant="standard"
                          required
                          focused={(diplomItem.finish?.length ?? 0) > 0}
                        />
                      </Stack>
                      <TextField
                        key="experience-diplom-degree"
                        label="Degree"
                        value={diplomItem.degree}
                        onChange={(e) =>
                          onChange(
                            `education[${educationIndex}].diploms[${diplomIndex}].degree`,
                            e.target.value
                          )
                        }
                        variant="standard"
                        required
                        focused={(diplomItem.degree?.length ?? 0) > 0}
                      />
                      <TextField
                        key="experience-diplom-specialization"
                        label="Specialization"
                        value={diplomItem.specialization}
                        onChange={(e) =>
                          onChange(
                            `education[${educationIndex}].diploms[${diplomIndex}].specialization`,
                            e.target.value
                          )
                        }
                        variant="standard"
                        required
                        focused={(diplomItem.specialization?.length ?? 0) > 0}
                      />
                    </Stack>
                  </AccordionPlus>
                ))}
              </Stack>
            </AccordionPlus>
          )
        )}
        <Typography variant="h2">
          Certificates <AddCircleIcon />
        </Typography>
      </Stack>
    </Box>
  );
}
