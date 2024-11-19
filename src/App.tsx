import { useEffect, useState } from "react";
import "./App.scss";
import { MigrationService } from "./database/services/MigrationService";
import { ResumeService } from "./database/services/ResumeService";
import { ResumeDto } from "./database/models/Dto";
import { RoutesComponent } from "./Routes";
import useResumeValidationSchema from "./pages/validationSchemas/useResumeValidationSchema";
import { generalInfoValidation } from "./pages/validationSchemas/generalInfoValidation";

function App() {
  const [checkDatabase, setCheckDatabase] = useState(false);
  const [schemaValues, setSchemaValues] = useState({});

  useEffect(() => {
    MigrationService.checkUpdatingDatabase().then(() => setCheckDatabase(true));
  }, []);

  useEffect(() => {
    ResumeService.getResume().then((res: ResumeDto) => {
      console.log(res);
      setSchemaValues(res);
      resumeValidationSchema.setValues(res);
    });
  }, [checkDatabase]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDataSubmit = (values: any) => {
    ResumeService.saveResume(values).then((res: ResumeDto) => {
      console.log(res);
      setSchemaValues(res);
      resumeValidationSchema.setValues(res);
    });
  };

  const resumeValidationSchema = useResumeValidationSchema(
    schemaValues,
    generalInfoValidation,
    handleDataSubmit
  );

  const handleChangeField = (field: string, arg: unknown) => {
    resumeValidationSchema.setFieldTouched(field, false);
    resumeValidationSchema.setFieldValue(field, arg, false);
  };

  const handleBlurField = (field: string) => {
    resumeValidationSchema.setFieldTouched(field, true);
  };

  return (
    <RoutesComponent
      schema={resumeValidationSchema}
      onChange={handleChangeField}
      onBlur={handleBlurField}
      onSave={() => handleDataSubmit(resumeValidationSchema.values)}
    />
  );
}

export default App;
