import { Stack, Typography } from "@mui/material";
import { ExperienceFrontDto } from "../../models/FrontDto";
import styles from "./ExperienceElement.module.scss";

interface ExperienceElementProps {
  item: ExperienceFrontDto;
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
      {item.functions?.map((i) => (
        <Typography>{i}</Typography>
      ))}
      {item.tasks && (
        <ul>
          {item.tasks?.map((i) => (
            <li>{i.description}</li>
          ))}
        </ul>
      )}
    </Stack>
  );
}
