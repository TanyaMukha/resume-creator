import { useEffect, useState } from "react";
import styles from "./EditForm.module.scss";
import { ResumeDto } from "../../database/models/Dto";
import { ResumeService } from "../../database/services/ResumeService";
import useResumeValidationSchema from "./useResumeValidationSchema";
import { resumeSteps } from "./constants";

import { classNames } from "../../helpers/classNames";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Stack,
  ThemeProvider,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import Positions from "./components/Positions/Positions";
import Education from "./components/Education/Education";
import Experience from "./components/Experience/Experience";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { customTheme } from "./EditForm.theme";
import Home from "../Home/Home";

export default function EditForm() {
  const [resume, setResume] = useState<ResumeDto>({} as ResumeDto);
  const [stepper, setStepper] = useState<{ index: number; label: string }[]>(
    []
  );
  const [step, setStep] = useState<number>(0);
  const [schemaValues, setSchemaValues] = useState({});
  const [validationSchema, setValidationSchema] = useState(
    resumeSteps[0].validation
  );
  const [moveForvard, setMoveForvard] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDataSubmit = (values: any) => {
    setSchemaValues(values);
  };

  const resumeValidationSchema = useResumeValidationSchema(
    schemaValues,
    validationSchema,
    handleDataSubmit
  );

  const handleSetStep = (e: number) => setStep(e);

  //   const handleResumeSubmit = (values: ResumeDto) => {
  //     setResume({ ...resume, ...values });
  //   };

  //   let schema = useResumeValidationSchema(resume, resumeSteps[step].validation, handleResumeSubmit);

  const handleChangeField = (field: string, arg: unknown) => {
    resumeValidationSchema.setFieldTouched(field, false);
    resumeValidationSchema.setFieldValue(field, arg, false);
  };

  const handleBlurField = (field: string) => {
    resumeValidationSchema.setFieldTouched(field, true);
  };

  useEffect(() => {
    ResumeService.getResume().then((res) => {
      setResume(res);
      resumeValidationSchema.setValues(res);
    });
  }, []);

  //   useEffect(() => {
  //     console.log(id);
  //     if (id) {
  //       ResumeService.getResume(id)
  //         .then((res) => schema.setValues(res))
  //         .catch((e) => console.error(e));
  //     }
  //   }, []);

  useEffect(() => {
    console.log("resumeValidationSchema.values", resumeValidationSchema.values);
    console.log("resumeValidationSchema.errors", resumeValidationSchema.errors);
    console.log("validationSchema", validationSchema);
  }, [resumeValidationSchema.values, resumeValidationSchema.errors]);

  const handleChangeStep = (e: number) => {
    if (e >= 0) {
      if (moveForvard) handleSetStep(step + e);
    } else handleSetStep(step + e);
    setMoveForvard(false);
  };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={customTheme}>
      <>
        <BottomNavigation
          showLabels
          value={step}
          onChange={(event, newValue) => {
            setStep(newValue);
          }}
          sx={{ marginBottom: "64px" }}
        >
          <BottomNavigationAction
            label="General Info"
            icon={<PersonIcon fontSize="large" />}
            value={0}
          />
          <BottomNavigationAction
            label="Position"
            icon={<BadgeIcon fontSize="large" />}
            value={1}
          />
          <BottomNavigationAction
            label="Education"
            icon={<SchoolIcon fontSize="large" />}
            value={2}
          />
          <BottomNavigationAction
            label="Experience"
            icon={<WorkIcon fontSize="large" />}
            value={3}
          />
          <BottomNavigationAction
            label="Return"
            icon={<LogoutIcon fontSize="large" />}
            value={4}
          />
        </BottomNavigation>
        {/* <Stack direction="row"> */}
        {/* <Home /> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {step === 0 && (
            <GeneralInfo
              formikValidationSchema={resumeValidationSchema}
              step={0}
              onChange={handleChangeField}
              onBlur={handleBlurField}
            />
          )}
          {step === 1 && (
            <Positions
              formikValidationSchema={resumeValidationSchema}
              step={1}
              onChange={handleChangeField}
              onBlur={handleBlurField}
            />
          )}
          {step === 2 && (
            <Education
              formikValidationSchema={resumeValidationSchema}
              step={2}
              onChange={handleChangeField}
              onBlur={handleBlurField}
            />
          )}
          {step === 3 && (
            <Experience
              formikValidationSchema={resumeValidationSchema}
              step={3}
              onChange={handleChangeField}
              onBlur={handleBlurField}
            />
          )}
        </Box>
        {/* </Stack> */}
        {step === 4 && navigate("/")}
      </>
    </ThemeProvider>
  );
}
