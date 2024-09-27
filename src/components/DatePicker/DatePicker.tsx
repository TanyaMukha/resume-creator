import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
  DateView,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FC } from "react";
// import styles from "./ParagraphTitle.module.scss";

export interface DatePickerProps {
  label: string;
  value?: string;
  onChange?: (e: string) => void;
  onBlur?: (field: string) => void;
  dateFormat: string;
  helperText?: string;
  views?: DateView[]
}

export const DatePicker: FC<DatePickerProps> = ({ label, value, onChange, dateFormat, helperText, views }) => {
  // const dateFormat = "MM.YYYY"
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        key="experience-project-start"
        className="date-picker"
        slotProps={{
          textField: {
            variant: "filled",
            focused: true,
            helperText: helperText,
          },
        }}
        label={label}
        value={
          dayjs(value, dateFormat).isValid()
            ? dayjs(value, dateFormat)
            : undefined
        }
        onChange={(e) => e && onChange?.(e.format(dateFormat))}
        format={dateFormat}
        views={views}
      />
    </LocalizationProvider>
  );
};
