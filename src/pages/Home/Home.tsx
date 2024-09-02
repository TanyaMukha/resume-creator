import { Box, Stack, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InfoBlock from "./components/InfoBlock/InfoBlock";
import ExperienceElement from "./components/ExperienceElement/ExperienceElement";
import { LanguageLevel } from "../../database/models/enums";
import styles from "./Home.module.scss";
import { ResumeDto } from "../../database/models/Dto";
import { ResumeService } from "../../database/services/ResumeService";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";
import ContactElement from "./components/ContactElement/ContactElement";
import EducationElement from "./components/EducationElement/EducationElement";
import { DataHelper } from "../../database/helpers/DataHelper";
import { customTheme } from "./Home.theme";

export default function Home() {
  const [resume, setResume] = useState<ResumeDto>();

  useEffect(() => {
    ResumeService.getResume().then((res) => setResume(res));
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <Box className={styles.container}>
        <Box className={styles.editButton}>
          <Link to="/edit">
            <EditNoteIcon className={styles.editIcon} />
          </Link>
        </Box>
        <Typography variant="h1">{`${resume?.firstName} ${resume?.lastName}`}</Typography>
        <Typography variant="h2">{resume?.positions[0]?.title}</Typography>
        <Typography>{resume?.positions[0]?.salary}</Typography>
        <Stack direction="row" spacing={5}>
          <Stack>
            <InfoBlock title="Summary">
              <Typography>{resume?.positions[0]?.summary}</Typography>
            </InfoBlock>
            {resume?.positions[0]?.expectation && (
              <InfoBlock title="Expectation">
                {resume?.positions[0]?.expectation}
              </InfoBlock>
            )}
            <InfoBlock title="Experience">
              {resume?.experience.map((item, index) => (
                <ExperienceElement item={item} key={index} />
              ))}
            </InfoBlock>
          </Stack>
          <Stack>
            <InfoBlock title="Contacts">
              {resume?.contacts.map((item, index) => (
                <ContactElement item={item} key={index} />
              ))}
            </InfoBlock>
            <InfoBlock title="Skills">
              {resume?.positions[0]?.skills.map((item, index) => (
                <div key={index}>{item.title}</div>
              ))}
            </InfoBlock>
            <InfoBlock title="Languages">
              {resume?.languages?.map((item, index) => (
                <div key={index}>
                  <b>{item.title}</b>: {item.level}{" "}
                  {item.level != LanguageLevel.Native &&
                    `(${DataHelper.getEnumKeyByValue(
                      LanguageLevel,
                      item.level
                    )})`}
                </div>
              ))}
            </InfoBlock>
            <InfoBlock title="Education">
              {resume?.education.map((item, index) => (
                <EducationElement item={item} key={index} />
              ))}
            </InfoBlock>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
