import { useFormik } from "formik"

const useResumeValidationSchema = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => void,
) => {
  const formikForms = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    isInitialValid: false,
    validationSchema: validationSchema,

    onSubmit: (values) => {
      onSubmit(values)
    },
  })

  return formikForms
}

export default useResumeValidationSchema
