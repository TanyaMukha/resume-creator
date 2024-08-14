import { Box, Stack, TextField, Typography } from "@mui/material";
import styles from "./Positions.module.scss";
import { FormikProps } from "formik";
import { AccordionPlus } from "../../../../components/Accordion/Accordion";
import { ContactDto, PositionDto } from "../../../../database/models/Dto";

interface PositionsProps {
  formikValidationSchema: FormikProps<any>;
  // setDisabled: (e: boolean) => void
  step: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
}

export default function Positions(props: PositionsProps) {
  const { formikValidationSchema, step, onChange, onBlur } = props;

  return (
    <Box className={styles.container}>
      <Typography>Positions</Typography>
      //{" "}
      {formikValidationSchema.values?.positions?.map((item: PositionDto, index: number) => (
        <AccordionPlus
          title={item.title ?? "New position"}
          classes={{
            summary: styles.pruneTitle,
            details: styles.docAccordionDetails,
          }}
          onClickDeleteIcon={() =>
            onChange(
              `positions`,
              formikValidationSchema.values?.positions?.filter((_: PositionDto, i: number) => i !== index)
            )
          }
          key={index}
        >
          <Stack className={styles.documentAccordion}>
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
            />
            <TextField
              key="position-expectation"
              label="Expectation"
              value={item.expectation}
              onChange={(e) =>
                onChange(
                  `positions[${index}].expectation`,
                  e.target.value
                )
              }
              variant="standard"
              required
              focused={(item.expectation?.length ?? 0) > 0}
            />
          </Stack>
        </AccordionPlus>
      ))}
    </Box>
  );
}
