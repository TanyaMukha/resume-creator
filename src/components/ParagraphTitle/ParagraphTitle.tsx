import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
// import styles from "./ParagraphTitle.module.scss";

export interface ParagraphTitleProps {
  title: string;
  buttonCaption: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  onClick?: () => void
}

export const ParagraphTitle: FC<ParagraphTitleProps> = ({
  title,
  buttonCaption,
  variant = "h3",
  onClick,
}) => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderBottom: "1px solid black",
      }}
    >
      <Typography variant={variant} sx={{ marginBottom: 0 }}>
        {title}
      </Typography>
      <Button
        sx={{
          lineHeight: "1em",
          fontSize: "13px",
          marginBottom: "4px",
          padding: "6px 8px 6px 8px",
          marginRight: 0,
        }}
        onClick={onClick}
      >
        {buttonCaption}
      </Button>
    </Stack>
  );
};
