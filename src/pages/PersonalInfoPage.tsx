import { FC, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Add as AddIcon, Save as SaveIcon } from "@mui/icons-material";
import { ContactDto, LanguageDto } from "../database/models/Dto";
import { FormikProps } from "formik";
import { LanguageForm } from "./forms/LanguageForm";
import { ContactForm } from "./forms/ContactForm";
import { ContactType } from "../database/models/enums";
import dayjs from "dayjs";
import { GrowthHighlightsSection } from "./components/GrowthHighlightsSection";

interface PersonalInfoPageProps {
  schema: FormikProps<any>;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onSave: () => void;
}

export const PersonalInfoPage: FC<PersonalInfoPageProps> = ({
  schema,
  onChange,
  onSave,
}) => {
  const dateFormat = "DD.MM.YYYY";

  const getExistingContactTypes = () =>
    (schema.values.contacts as ContactDto[])?.map((contact) => contact.type);

  const [existingContactTypes, setExistingContactTypes] = useState(
    getExistingContactTypes()
  );

  useEffect(() => {
    setExistingContactTypes(getExistingContactTypes());
  }, [schema.values.contacts]);

  const handleAddContact = () => {
    const remainders = Object.values(ContactType).filter(
      (type) => !existingContactTypes.includes(type)
    );
    onChange(`contacts[${schema.values.contacts?.length}]`, {
      id: 0,
      type: remainders.length === 1 ? remainders[0] : undefined,
      resume_id: schema.values.id,
    });
  };

  const handleDeleteContact = (index: number) =>
    onChange(
      `contacts`,
      schema.values?.contacts?.filter((_: any, i: number) => i !== index)
    );

  const handleAddLanguage = () => {
    onChange(`languages[${schema.values.languages?.length}]`, {
      id: 0,
      resume_id: schema.values.id,
    });
  };

  const handleDeleteLanguage = (index: number) =>
    onChange(
      `languages`,
      schema.values?.languages?.filter((_: any, i: number) => i !== index)
    );

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Personal Information
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={onSave}
          size="large"
        >
          Save Changes
        </Button>
      </Box>

      {/* Basic Information */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Basic Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              value={schema.values.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              placeholder="Enter your first name"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={schema.values.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              placeholder="Enter your last name"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Birth Date"
                value={
                  dayjs(schema.values.birthday, dateFormat).isValid()
                    ? dayjs(schema.values.birthday, dateFormat)
                    : null
                }
                onChange={(e) => onChange("birthday", e?.format(dateFormat))}
                sx={{ width: "100%" }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    placeholder: dateFormat,
                  },
                }}
                format={dateFormat}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Paper>

      {/* Languages Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6">Languages</Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddLanguage}
          >
            Add Language
          </Button>
        </Box>

        <Stack spacing={2}>
          {schema.values.languages?.map(
            (language: LanguageDto, index: number) => (
              <LanguageForm
                key={language.id}
                language={language}
                index={index}
                onChange={onChange}
                onDelete={() => handleDeleteLanguage(index)}
                onBlur={() => {}}
              />
            )
          )}
          {schema.values.languages?.length === 0 && (
            <Typography color="text.secondary" align="center" py={2}>
              No languages added yet. Click "Add Language" to start.
            </Typography>
          )}
        </Stack>
      </Paper>

      {/* Contacts Section */}
      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6">Contact Information</Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddContact}
          >
            Add Contact
          </Button>
        </Box>

        <Stack spacing={2}>
          {schema.values.contacts
            ?.sort(
              (a: ContactDto, b: ContactDto) => (a.display_order || 0) - (b.display_order || 0)
            )
            .map((contact: ContactDto, index: number) => (
              <ContactForm
                key={contact.id}
                contact={contact}
                index={index}
                onChange={onChange}
                onBlur={() => {}}
                onDelete={() => handleDeleteContact(index)}
              />
            ))}
          {schema.values.contacts?.length === 0 && (
            <Typography color="text.secondary" align="center" py={2}>
              No contacts added yet. Click "Add Contact" to start.
            </Typography>
          )}
        </Stack>
      </Paper>

      {/* <GrowthHighlightsSection /> */}
    </Box>
  );
};
