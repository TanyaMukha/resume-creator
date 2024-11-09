import { Typography } from "@mui/material";
import { FC } from "react";
import { AddItemIcon } from "../AddItemIcon/AddItemIcon";

interface ParagraphTitlePlusOneProps {
  title: string;
  onClick?: () => void;
  hideIcon?: boolean;
}

export const ParagraphTitlePlusOne: FC<ParagraphTitlePlusOneProps> = ({
  title,
  onClick,
  hideIcon = false,
}) => {
  return (
    <Typography
      variant="h2"
      sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}
    >
      {title}
      {!hideIcon && <AddItemIcon onClick={onClick} />}
    </Typography>
  );
};
