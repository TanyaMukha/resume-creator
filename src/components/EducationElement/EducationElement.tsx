import { Stack, Typography } from "@mui/material";
import { Education } from "../../models/FrontDto";

interface EducationElementProps {
  item: Education;
}

export default function EducationElement(props: EducationElementProps) {
  const { item } = props;

  return (
    <Stack>
      <Typography variant="h3">{item.university}</Typography>
      {item.diploms.map((i) => (
        <Typography>
          {i.start} - {i.finish} <b>{i.degree}</b> degree of {i.specialization}
        </Typography>
      ))}
    </Stack>
  );
}
