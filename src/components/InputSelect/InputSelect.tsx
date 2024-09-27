import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { RefObject } from "react"

import { classNames } from "../../../helpers/classNames"
import { ExpandMore } from "../../Icons"
import styles from "./InputSelect.module.scss"

interface InputSelectProps {
  options: { value: string; label: string; selected?: boolean }[]
  isShowLabel?: boolean
  value?: string
  defaultValue?: string
  onChange?: (event: SelectChangeEvent<string>) => void
  onBlur?: () => void
  name?: string
  label?: string
  error?: string
  width?: string | number
  formControlProps?: FormControlProps
  disableScrollLock?: boolean
  multiple?: boolean
  placeholder?: string
  className?: string
  refInputSelect?: RefObject<HTMLInputElement>
  disabled?: boolean
}

export const InputSelect: React.FC<InputSelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  onBlur,
  name,
  width,
  label,
  error,
  refInputSelect,
  formControlProps,
  disableScrollLock,
  placeholder,
  multiple,
  className,
  disabled,
}) => {
  return (
    <FormControl
      variant="standard"
      style={width ? { width } : undefined}
      error={!!error}
      {...formControlProps}
      className={classNames(styles.root, className)}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        defaultValue={defaultValue}
        multiple={multiple ?? false}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        className={styles.select}
        IconComponent={ExpandMore}
        displayEmpty={!!placeholder}
        disabled={disabled}
        ref={refInputSelect}
        renderValue={(selected: string | string[]) =>
          selected.length
            ? Array.isArray(selected)
              ? options
                  .filter((opt) => selected.includes(opt.value))
                  .map((o) => o.label)
                  .join(", ")
              : options.find((opt) => selected === opt.value)?.label
            : placeholder
        }
        MenuProps={{
          disableScrollLock: disableScrollLock,
          sx: {
            "& > .MuiPaper-root": {
              maxHeight: 280,
              "& .MuiButtonBase-root": {
                whiteSpace: "normal",
                textAlign: "left",
              },
            },
          },
        }}
        sx={{
          "& > .MuiSelect-icon": {
            color: disabled ? "#00001a42" : "#540352",
            top: 8,
          },
          "& > .MuiSelect-select": {
            color: value?.length ? "#540352" : "#7A6C79",
            fontWeight: 400,
          },
          "&.Mui-focused > .MuiSelect-select": {
            color: disabled ? "#00001a42" : "#540352",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={`input-${index}`}
            value={option.value}
            component="button"
            type="button"
            sx={{
              width: "100%",
            }}
            selected={option.selected}
            className={styles["no-wrap-ellipsis"]}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText
          sx={{ color: "#e2000b", fontSize: 14, fontFamily: "DM Sans" }}
        >
          {error}
        </FormHelperText>
      )}
    </FormControl>
  )
}
