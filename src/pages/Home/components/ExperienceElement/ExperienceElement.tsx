import { Stack, Typography } from "@mui/material";
import styles from "./ExperienceElement.module.scss";
import { ExperienceDto } from "../../../../database/models/Dto";

interface ExperienceElementProps {
  item: ExperienceDto;
}

export default function ExperienceElement(props: ExperienceElementProps) {
  const { item } = props;

  return (
    <Stack className={styles.container}>
      <Typography variant="h3">{item.company}</Typography>
      <Stack direction="row" spacing={2}>
        <Typography>
          {item.start} - {item.finish}
        </Typography>
        <Typography fontWeight="bold">{item.position}</Typography>
      </Stack>
      {/* {item.tasks?.map((item, index) => (
        <Typography key={index}>{item.description}</Typography>
      ))} */}
      <Typography>{item.description}</Typography>
      {item.achievements && (
        <ul>
          {item.achievements?.map((item, index) => (
            <li key={index}>{item.achievement}</li>
          ))}
        </ul>
      )}
    </Stack>
  );
}
