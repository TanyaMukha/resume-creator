import { Box, Stack, TextField, Typography } from "@mui/material";
import styles from "./Experience.module.scss";
import { FormikProps } from "formik";
import { AccordionPlus } from "../../../../components/Accordion/Accordion";
import { ExperienceDto } from "../../../../database/models/Dto";

interface ExperienceProps {
  formikValidationSchema: FormikProps<any>;
  // setDisabled: (e: boolean) => void
  step: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
}

export default function Experience(props: ExperienceProps) {
  const { formikValidationSchema, step, onChange, onBlur } = props;

  return (
    <Box className={styles.container}>
      <Typography>Experience</Typography>
      {formikValidationSchema.values?.experience?.map(
        (item: ExperienceDto, index: number) => (
          <AccordionPlus
            title={item.company ?? "New experience"}
            classes={{
              summary: styles.pruneTitle,
              details: styles.docAccordionDetails,
            }}
            onClickDeleteIcon={() =>
              onChange(
                `experience`,
                formikValidationSchema.values?.experience?.filter(
                  (_: ExperienceDto, i: number) => i !== index
                )
              )
            }
            key={index}
          >
            <Stack className={styles.documentAccordion}>
              <TextField
                key="experience-company"
                label="Company"
                value={item.company}
                onChange={(e) =>
                  onChange(`experience[${index}].company`, e.target.value)
                }
                variant="standard"
                required
                focused={(item.company?.length ?? 0) > 0}
              />
              <TextField
                key="experience-type"
                label="Type"
                value={item.type}
                onChange={(e) =>
                  onChange(`experience[${index}].type`, e.target.value)
                }
                variant="standard"
                required
                focused={(item.type?.length ?? 0) > 0}
              />
              <TextField
                key="experience-position"
                label="Position"
                value={item.position}
                onChange={(e) =>
                  onChange(`experience[${index}].position`, e.target.value)
                }
                variant="standard"
                required
                focused={(item.position?.length ?? 0) > 0}
              />
              <TextField
                key="experience-description"
                label="Description"
                value={item.description}
                onChange={(e) =>
                  onChange(`experience[${index}].description`, e.target.value)
                }
                variant="standard"
                focused={(item.description?.length ?? 0) > 0}
              />
              <TextField
                key="experience-start"
                label="Start"
                value={item.start}
                onChange={(e) =>
                  onChange(`experience[${index}].start`, e.target.value)
                }
                variant="standard"
                required
                focused={(item.start?.length ?? 0) > 0}
              />
              <TextField
                key="experience-finish"
                label="Finish"
                value={item.finish}
                onChange={(e) =>
                  onChange(`experience[${index}].finish`, e.target.value)
                }
                variant="standard"
                required
                focused={(item.finish?.length ?? 0) > 0}
              />
            </Stack>
          </AccordionPlus>
        )
      )}
    </Box>
  );
}
