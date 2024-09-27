import { Button, Stack } from "@mui/material";
import { FC } from "react";
// import styles from "./ParagraphTitle.module.scss";

export interface AddButtonProps {
  title: string;
  onClick?: () => void;
}

export const AddButton: FC<AddButtonProps> = ({ title, onClick }) => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "center",
      }}
    >
      <Button sx={{ lineHeight: "1em" }} onClick={onClick}>
        {title}
      </Button>
    </Stack>
  );
};
