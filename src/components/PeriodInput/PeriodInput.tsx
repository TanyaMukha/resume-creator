import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { FC } from "react";
import { DatePicker } from "../DatePicker/DatePicker";
// import styles from "./ParagraphTitle.module.scss";

interface DatePickerProps {
  label: string;
  value?: string;
  onChange?: (e: any) => void;
}

export interface PeriodInputProps {
  start: DatePickerProps;
  finish: DatePickerProps;
}

export const PeriodInput: FC<PeriodInputProps> = ({ start, finish }) => {
  return (
    <Stack direction="row" spacing={2}>
      <DatePicker
        label={start.label}
        value={start.value}
        onChange={start.onChange}
        dateFormat = "MM.YYYY"
        views={["year", "month"]}
      />
      <DatePicker
        label={finish.label}
        value={finish.value}
        onChange={finish.onChange}
        dateFormat = "MM.YYYY"
        views={["year", "month"]}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="to the present day"
        sx={{ display: "flex", span: { margin: 0 } }}
      />
    </Stack>
  );
};
