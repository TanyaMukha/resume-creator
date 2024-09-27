import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  InputProps,
} from "@mui/material";
// import { ChangeEvent, FC } from "react";
// import styles from "./ParagraphTitle.module.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export interface ListItemInputProps extends InputProps {
  label?: string;
  //   value: string;
  //   onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onDelete?: () => void;
}

export const ListItemInput = (props: ListItemInputProps) => {
  const { label, onDelete } = props;
  return (
    <FormControl sx={{ marginBottom: 1 }} variant="standard">
      <InputLabel htmlFor="standard-text">{label}</InputLabel>
      <Input
        {...props}
        id="standard-text"
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              //   aria-label="toggle password visibility"
              onClick={onDelete}
              //   onMouseDown={handleMouseDownPassword}
              //   onMouseUp={handleMouseUpPassword}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </InputAdornment>
        }
        // value={value}
        // onChange={onChange}
      />
    </FormControl>
  );
};
