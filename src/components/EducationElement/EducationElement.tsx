import { Stack, Typography } from "@mui/material";
import { EducationFrontDto } from "../../models/FrontDto";

interface EducationElementProps {
  item: EducationFrontDto;
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
