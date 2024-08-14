import { Box, Stack, TextField, Typography } from "@mui/material";
import styles from "./Education.module.scss";
import { FormikProps } from "formik";
import { AccordionPlus } from "../../../../components/Accordion/Accordion";
import { ContactDto } from "../../../../database/models/Dto";

interface EducationProps {
  // formikValidationSchema: FormikProps<any>;
  // // setDisabled: (e: boolean) => void
  // step: number;
  // onChange: (field: string, arg: unknown) => void;
  // onBlur: (field: string) => void;
}

export default function Education(props: EducationProps) {
  // const { formikValidationSchema, step, onChange, onBlur } = props;

  return (
    <Box className={styles.container}>
      <Typography>Education</Typography>
    </Box>
  );
}
