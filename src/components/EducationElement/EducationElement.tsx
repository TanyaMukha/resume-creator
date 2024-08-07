import { Stack, Typography } from "@mui/material";
import { EducationDto } from "../../database/models/Dto";

interface EducationElementProps {
  item: EducationDto;
}

export default function EducationElement(props: EducationElementProps) {
  const { item } = props;

  return (
    <Stack>
      <Typography variant="h3">{item.university}</Typography>
      {item.diploms.map((item, index) => (
        <Typography key={index}>
          {item.start} - {item.finish} <b>{item.degree}</b> degree of{" "}
          {item.specialization}
        </Typography>
      ))}
    </Stack>
  );
}
