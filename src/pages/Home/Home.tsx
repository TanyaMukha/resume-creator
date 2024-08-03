import { Box, Stack, Typography } from "@mui/material";
import { MY_RESUME } from "../../private/myResume";
import { ResumeFrontDto } from "../../models/FrontDto";
import { useState } from "react";
import InfoBlock from "../../components/InfoBlock/InfoBlock";
import ContactElement from "../../components/ContactElement/ContactElement";
import EducationElement from "../../components/EducationElement/EducationElement";
import ExperienceElement from "../../components/ExperienceElement/ExperienceElement";
import { LanguageLevel } from "../../constants";
import { getEnumKeyByValue } from "../../helpers/getEnumKeyByValue";
import styles from "./Home.module.scss";

export default function Home() {
  const [person] = useState<ResumeFrontDto>(MY_RESUME);
  console.log(MY_RESUME);

  return (
    <Box className={styles.container}>
      <Typography variant="h1">{`${person.firstName} ${person.lastName}`}</Typography>
      <Typography variant="h2">{person.positions[0]?.title}</Typography>
      <Typography>{person.positions[0]?.salary}</Typography>
      <Stack direction="row" spacing={5}>
        <Stack>
          <InfoBlock title="Summary">
            <Typography>{person.positions[0]?.summary}</Typography>
          </InfoBlock>
          {person.positions[0]?.expectation && (
            <InfoBlock title="Expectation">
              {person.positions[0]?.expectation}
            </InfoBlock>
          )}
          <InfoBlock title="Experience">
            {person.experience.map((i) => (
              <ExperienceElement item={i} />
            ))}
          </InfoBlock>
        </Stack>
        <Stack>
          <InfoBlock title="Contacts">
            {person.contacts.map((i) => (
              <ContactElement item={i} />
            ))}
          </InfoBlock>
          <InfoBlock title="Skills">
            {person.positions[0]?.relatedSkills.map((i) => (
              <div>{i.title}</div>
            ))}
          </InfoBlock>
          <InfoBlock title="Languages">
            {person.languages?.map((i) => (
              <div>
                <b>{i.title}</b>: {i.level}{" "}
                {i.level != LanguageLevel.Native &&
                  `(${getEnumKeyByValue(LanguageLevel, i.level)})`}
              </div>
            ))}
          </InfoBlock>
          <InfoBlock title="Education">
            {person.education.map((i) => (
              <EducationElement item={i} />
            ))}
          </InfoBlock>
        </Stack>
      </Stack>
    </Box>
  );
}
