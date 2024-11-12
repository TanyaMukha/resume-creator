import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import styles from "../Step.module.scss";
import { FormikProps } from "formik";
import { AccordionPlus } from "../../../../components/Accordion/Accordion";
import { ContactDto, LanguageDto } from "../../../../database/models/Dto";
import { AddButton } from "../../../../components/Buttons/AddButton";
import { DatePicker } from "../../../../components/DatePicker/DatePicker";
import { ContactType, LanguageLevel } from "../../../../database/models/enums";
import { useEffect, useState } from "react";
import { ParagraphTitlePlusOne } from "../../../../components/ParagraphTitlePlusOne/ParagraphTitlePlusOne";

interface GeneralInfoProps {
  formikValidationSchema: FormikProps<any>;
  // setDisabled: (e: boolean) => void
  step: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
}

export default function GeneralInfo(props: GeneralInfoProps) {
  const { formikValidationSchema, step, onChange, onBlur } = props;

  const getExistingContactTypes = () =>
    (formikValidationSchema.values.contacts as ContactDto[])?.map(
      (contact) => contact.type
    );

  const [existingContactTypes, setExistingContactTypes] = useState(
    getExistingContactTypes()
  );

  useEffect(() => {
    setExistingContactTypes(getExistingContactTypes());
  }, [formikValidationSchema.values.contacts]);

  const handleAddContact = () => {
    const remainders = Object.values(ContactType).filter(
      (type) => !existingContactTypes.includes(type)
    );
    onChange(`contacts[${formikValidationSchema.values.contacts?.length}]`, {
      id: 0,
      type: remainders.length === 1 ? remainders[0] : undefined,
      resume_id: formikValidationSchema.values.id,
    });
  };

  const handleAddLanguage = () => {
    onChange(`languages[${formikValidationSchema.values.languages?.length}]`, {
      id: 0,
      resume_id: formikValidationSchema.values.id,
    });
  };

  return (
    <Box
      className={styles.container}
      sx={{ maxWidth: "800px", alignItems: "center" }}
    >
      <ParagraphTitlePlusOne title={"General info"} hideIcon={true} />
      <Stack sx={{ width: "100%", alignItems: "stretch" }}>
        <Stack direction="row" gap="16px" sx={{ maxWidth: "800px" }}>
          <TextField
            key="first-name"
            label="First name"
            value={formikValidationSchema.values?.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            onBlur={() => onBlur("firstName")}
            helperText={formikValidationSchema.errors.firstName as string}
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
            onBlur={() => onBlur("lastName")}
            helperText={formikValidationSchema.errors.lastName as string}
            variant="standard"
            required
            focused={(formikValidationSchema.values?.lastName?.length ?? 0) > 0}
            sx={{ width: "100%" }}
          />
        </Stack>
        <Stack
          direction="row"
          gap="16px"
          sx={{ maxWidth: "800px" }}
          alignItems="flex-end"
        >
          <DatePicker
            label="Birthday"
            value={formikValidationSchema.values?.birthday}
            onChange={(e) => onChange("birthday", e)}
            onBlur={() => onBlur("birthday")}
            helperText={formikValidationSchema.errors.birthday as string}
            dateFormat="DD.MM.YYYY"
          />
          <TextField
            key="age"
            label="Age"
            value={formikValidationSchema.values?.age}
            onChange={(e) => onChange("age", e.target.value)}
            onBlur={() => onBlur("age")}
            helperText={formikValidationSchema.errors.age as string}
            variant="standard"
            required
            disabled={true}
            InputLabelProps={{ shrink: true }}
          />
          {/* <FormControlLabel
            control={<Checkbox />}
            label="show my age"
            sx={{ display: "flex", span: { margin: 0 } }}
          /> */}
        </Stack>
      </Stack>

      <ParagraphTitlePlusOne
        title={"Contacts"}
        hideIcon={
          existingContactTypes?.length === Object.keys(ContactType).length
        }
        onClick={handleAddContact}
      />

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
            key={item.type ?? index}
          >
            <Stack
              className={styles.documentAccordion}
              sx={{ alignItems: "stretch" }}
            >
              {!item.type && (
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  variant="standard"
                  onChange={(e) =>
                    onChange(
                      `contacts[${index}].type`,
                      ContactType[e.target.value as keyof typeof ContactType]
                    )
                  }
                  label="Type"
                >
                  {Object.values(ContactType)
                    .filter((type) => !existingContactTypes.includes(type))
                    .map((type) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                </Select>
              )}
              <TextField
                key="contact-title"
                label="Title"
                value={item.title}
                onChange={(e) =>
                  onChange(`contacts[${index}].title`, e.target.value)
                }
                onBlur={() => onBlur(`contacts[${index}].title`)}
                helperText={
                  (formikValidationSchema.errors.contacts as any[])?.[index]
                    ?.title as string
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
                onBlur={() => onBlur(`contacts[${index}].value`)}
                helperText={
                  (formikValidationSchema.errors.contacts as any[])?.[index]
                    ?.value as string
                }
                variant="standard"
                required
                focused={(item.value?.length ?? 0) > 0}
              />
            </Stack>
          </AccordionPlus>
        )
      )}

      {existingContactTypes?.length !== Object.keys(ContactType).length && (
        <AddButton title="Add contact" onClick={handleAddContact} />
      )}

      <ParagraphTitlePlusOne title={"Languages"} onClick={handleAddLanguage} />

      {formikValidationSchema.values?.languages?.map(
        (item: LanguageDto, index: number) => (
          <AccordionPlus
            title={item.title ?? "New language"}
            classes={{
              summary: styles.pruneTitle,
              details: styles.docAccordionDetails,
            }}
            onClickDeleteIcon={() =>
              onChange(
                `languages`,
                formikValidationSchema.values?.languages?.filter(
                  (_: any, i: number) => i !== index
                )
              )
            }
            key={item.title ?? index}
          >
            <Stack
              className={styles.documentAccordion}
              sx={{ alignItems: "stretch" }}
            >
              <TextField
                key="language-title"
                label="Language"
                value={item.title}
                onChange={(e) =>
                  onChange(`languages[${index}].title`, e.target.value)
                }
                onBlur={() => onBlur(`languages[${index}].title`)}
                helperText={
                  (formikValidationSchema.errors.languages as any[])?.[index]
                    ?.title as string
                }
                variant="standard"
                required
                focused={(item.title?.length ?? 0) > 0}
              />
              <FormControl variant="standard">
                <InputLabel id={`language-level-label-${index}`}>
                  Level
                </InputLabel>
                <Select
                  labelId={`language-level-label-${index}`}
                  id={`language-level-select-${index}`}
                  variant="standard"
                  value={item.level}
                  onChange={(e) =>
                    onChange(
                      `languages[${index}].level`,
                      e.target.value as LanguageLevel
                    )
                  }
                  label="Level"
                >
                  {Object.entries(LanguageLevel).map(([key, label]) => (
                    <MenuItem key={key} value={label}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </AccordionPlus>
        )
      )}

      <AddButton title="Add language" onClick={handleAddLanguage} />
    </Box>
  );
}
