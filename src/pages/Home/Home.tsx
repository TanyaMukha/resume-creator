import { Box, Stack, Typography } from "@mui/material";
import { MY_RESUME } from "../../private/myResume";
import { useState } from "react";
import InfoBlock from "../../components/InfoBlock/InfoBlock";
import ContactElement from "../../components/ContactElement/ContactElement";
import EducationElement from "../../components/EducationElement/EducationElement";
import ExperienceElement from "../../components/ExperienceElement/ExperienceElement";
import { LanguageLevel } from "../../database/models/enums";
import styles from "./Home.module.scss";
import { ResumeDto } from "../../database/models/Dto";
import { getEnumKeyByValue } from "../../database/helpers/getEnumKeyByValue";

export default function Home() {
  const [person] = useState<ResumeDto>(MY_RESUME);
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
            {person.experience.map((item, index) => (
              <ExperienceElement item={item} key={index}/>
            ))}
          </InfoBlock>
        </Stack>
        <Stack>
          <InfoBlock title="Contacts">
            {person.contacts.map((item, index) => (
              <ContactElement item={item} key={index}/>
            ))}
          </InfoBlock>
          <InfoBlock title="Skills">
            {person.positions[0]?.skills.map((item, index) => (
              <div key={index}>{item.title}</div>
            ))}
          </InfoBlock>
          <InfoBlock title="Languages">
            {person.languages?.map((item, index) => (
              <div key={index}>
                <b>{item.title}</b>: {item.level}{" "}
                {item.level != LanguageLevel.Native &&
                  `(${getEnumKeyByValue(LanguageLevel, item.level)})`}
              </div>
            ))}
          </InfoBlock>
          <InfoBlock title="Education">
            {person.education.map((item, index) => (
              <EducationElement item={item} key={index}/>
            ))}
          </InfoBlock>
        </Stack>
      </Stack>
    </Box>
  );
}
