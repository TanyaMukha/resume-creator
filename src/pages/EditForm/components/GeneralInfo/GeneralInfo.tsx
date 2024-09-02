import { Box, Stack, TextField, Typography } from "@mui/material";
import styles from "../Step.module.scss";
import { FormikProps } from "formik";
import { AccordionPlus } from "../../../../components/Accordion/Accordion";
import { ContactDto } from "../../../../database/models/Dto";
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface GeneralInfoProps {
  formikValidationSchema: FormikProps<any>;
  // setDisabled: (e: boolean) => void
  step: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
}

export default function GeneralInfo(props: GeneralInfoProps) {
  const { formikValidationSchema, step, onChange, onBlur } = props;

  return (
    <Box
      className={styles.container}
      sx={{ maxWidth: "663px", alignItems: "center" }}
    >
      <Typography variant="h2">General info</Typography>
      <Stack sx={{ width: "100%", alignItems: "stretch" }}>
        <Stack direction="row" gap="16px" sx={{ maxWidth: "663px" }}>
          <TextField
            key="first-name"
            label="First name"
            value={formikValidationSchema.values?.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            variant="standard"
            required
            focused={
              (formikValidationSchema.values?.firstName?.length ?? 0) > 0
            }
            sx={{ width: "100%" }}
          />
          <TextField
            key="last-name"
            label="Last name"
            value={formikValidationSchema.values?.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            variant="standard"
            required
            focused={(formikValidationSchema.values?.lastName?.length ?? 0) > 0}
            sx={{ width: "100%" }}
          />
        </Stack>
        <TextField
          key="age"
          label="Age"
          value={formikValidationSchema.values?.age}
          onChange={(e) => onChange("age", e.target.value)}
          variant="standard"
          required
          focused={(formikValidationSchema.values?.age ?? 0) > 0}
        />
      </Stack>

      <Typography variant="h2">
        Contacts <AddCircleIcon />
      </Typography>

      {formikValidationSchema.values?.contacts?.map(
        (item: ContactDto, index: number) => (
          <AccordionPlus
            title={item.type ?? "New contact"}
            classes={{
              summary: styles.pruneTitle,
              details: styles.docAccordionDetails,
            }}
            onClickDeleteIcon={() =>
              onChange(
                `contacts`,
                formikValidationSchema.values?.contacts?.filter(
                  (_: any, i: number) => i !== index
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
                key="contact-title"
                label="Title"
                value={item.title}
                onChange={(e) =>
                  onChange(`contacts[${index}].title`, e.target.value)
                }
                variant="standard"
                required
                focused={(item.title?.length ?? 0) > 0}
              />
              <TextField
                key="contact-value"
                label="URL"
                value={item.value}
                onChange={(e) =>
                  onChange(`contacts[${index}].value`, e.target.value)
                }
                variant="standard"
                required
                focused={(item.value?.length ?? 0) > 0}
              />
            </Stack>
          </AccordionPlus>
        )
      )}
    </Box>
  );
}
