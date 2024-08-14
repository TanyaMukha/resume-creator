import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import styles from "./InfoBlock.module.scss";

interface InfoBlockProps {
  title: string;
  children: ReactNode;
}

export default function InfoBlock(props: InfoBlockProps) {
  const { title, children } = props;

  return (
    <Box className={styles.container}>
      <Typography variant="h2" className={styles.title}>{title}</Typography>
      {children}
    </Box>
  );
}
