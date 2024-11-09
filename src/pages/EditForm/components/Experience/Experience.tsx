import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../Step.module.scss";
import { FormikProps } from "formik";
import { AccordionPlus } from "../../../../components/Accordion/Accordion";
import {
  ExperienceAchievementDto,
  ExperienceDto,
  ProjectAchievementDto,
  ProjectDto,
  RoleDto,
  SkillDto,
} from "../../../../database/models/Dto";
import { useEffect, useState } from "react";
import { SkillService } from "../../../../database/services/SkillService";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ParagraphTitle } from "../../../../components/ParagraphTitle/ParagraphTitle";
import { AddButton } from "../../../../components/Buttons/AddButton";
import { ListItemInput } from "../../../../components/ListItemInput/ListItemInput";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { DatePicker } from "../../../../components/DatePicker/DatePicker";
import { PeriodInput } from "../../../../components/PeriodInput/PeriodInput";
import { ParagraphTitlePlusOne } from "../../../../components/ParagraphTitlePlusOne/ParagraphTitlePlusOne";

interface ExperienceProps {
  formikValidationSchema: FormikProps<any>;
  // setDisabled: (e: boolean) => void
  step: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
}

export default function Experience(props: ExperienceProps) {
  const { formikValidationSchema, step, onChange, onBlur } = props;
  const [skills, setSkills] = useState<SkillDto[]>([]);

  useEffect(() => {
    SkillService.getSkills().then((res) => {
      setSkills(res);
    });
  }, []);

  const addExperienceAchievement = (experienceIndex: number) =>
    onChange(
      `experience[${experienceIndex}].achievements[${
        formikValidationSchema.values.experience[experienceIndex]?.achievements
          ?.length ?? 0
      }]`,
      {
        id: 0,
        achievement: undefined,
      }
    );

  const addExperienceProject = (experienceIndex: number) =>
    onChange(
      `experience[${experienceIndex}].projects[${
        formikValidationSchema.values.experience[experienceIndex]?.projects
          ?.length ?? 0
      }]`,
      {
        id: 0,
      }
    );

  const addExperienceProjectAchievement = (
    experienceIndex: number,
    projectIndex: number
  ) =>
    onChange(
      `experience[${experienceIndex}].projects[${projectIndex}].achievements[${
        formikValidationSchema.values.experience[experienceIndex]?.projects[
          projectIndex
        ].achievements?.length ?? 0
      }]`,
      {
        id: 0,
      }
    );

  const addExperienceProjectRole = (
    experienceIndex: number,
    projectIndex: number
  ) =>
    onChange(
      `experience[${experienceIndex}].projects[${projectIndex}].roles[${
        formikValidationSchema.values.experience[experienceIndex]?.projects[
          projectIndex
        ]?.roles?.length ?? 0
      }]`,
      {
        id: 0,
      }
    );

  return (
    <Box className={styles.container}>
      <Stack sx={{ alignItems: "center" }}>
        <ParagraphTitlePlusOne title={"Experience"} hideIcon={false} />
        {formikValidationSchema.values?.experience?.map(
          (experienceItem: ExperienceDto, experienceIndex: number) => (
            <AccordionPlus
              title={experienceItem.company ?? "New experience"}
              classes={{
                summary: styles.pruneTitle,
                details: styles.docAccordionDetails,
              }}
              onClickDeleteIcon={() =>
                onChange(
                  `experience`,
                  formikValidationSchema.values?.experience?.filter(
                    (_: ExperienceDto, i: number) => i !== experienceIndex
                  )
                )
              }
              key={experienceIndex}
            >
              <Stack
                className={styles.documentAccordion}
                sx={{ alignItems: "stretch" }}
              >
                <Stack direction="row" spacing={2}>
                  <TextField
                    key="experience-company"
                    label="Company"
                    value={experienceItem.company}
                    onChange={(e) =>
                      onChange(
                        `experience[${experienceIndex}].company`,
                        e.target.value
                      )
                    }
                    variant="standard"
                    required
                    focused={(experienceItem.company?.length ?? 0) > 0}
                    sx={{ width: "100%" }}
                  />
                  <TextField
                    key="experience-type"
                    label="Type"
                    value={experienceItem.type}
                    onChange={(e) =>
                      onChange(
                        `experience[${experienceIndex}].type`,
                        e.target.value
                      )
                    }
                    variant="standard"
                    required
                    focused={(experienceItem.type?.length ?? 0) > 0}
                    sx={{ width: "140px" }}
                  />
                </Stack>
                <PeriodInput
                  start={{
                    label: "Start",
                    value: experienceItem.start,
                    onChange: (e) =>
                      onChange(`experience[${experienceIndex}].start`, e),
                  }}
                  finish={{
                    label: "Finish",
                    value: experienceItem.finish,
                    onChange: (e) =>
                      onChange(`experience[${experienceIndex}].finish`, e),
                  }}
                />
                <TextField
                  key="experience-position"
                  label="Position"
                  value={experienceItem.position}
                  onChange={(e) =>
                    onChange(
                      `experience[${experienceIndex}].position`,
                      e.target.value
                    )
                  }
                  variant="standard"
                  required
                  focused={(experienceItem.position?.length ?? 0) > 0}
                />
                <TextField
                  key="experience-description"
                  label="Description"
                  value={experienceItem.description}
                  onChange={(e) =>
                    onChange(
                      `experience[${experienceIndex}].description`,
                      e.target.value
                    )
                  }
                  variant="standard"
                  focused={(experienceItem.description?.length ?? 0) > 0}
                  multiline
                />
                <ParagraphTitle
                  title="Achievements"
                  buttonCaption="Add achievement"
                  onClick={() => addExperienceAchievement(experienceIndex)}
                />
                {experienceItem.achievements?.map(
                  (
                    achieveItem: ExperienceAchievementDto,
                    achieveIndex: number
                  ) => (
                    <ListItemInput
                      key={`experience-achievement-${achieveIndex}`}
                      label="Achievement"
                      value={achieveItem.achievement ?? ""}
                      onChange={(e) =>
                        onChange(
                          `experience[${experienceIndex}].achievements[${achieveIndex}].achievement`,
                          e.target.value
                        )
                      }
                      onDelete={() =>
                        onChange(
                          `experience[${experienceIndex}].achievements`,
                          experienceItem.achievements?.filter(
                            (_: ExperienceAchievementDto, i: number) =>
                              i !== achieveIndex
                          )
                        )
                      }
                      required
                      multiline
                    />
                  )
                )}
                {!!experienceItem.achievements?.length && (
                  <AddButton
                    title="Add achievement"
                    onClick={() => addExperienceAchievement(experienceIndex)}
                  />
                )}
                <ParagraphTitle
                  title="Projects"
                  buttonCaption="Add project"
                  onClick={() => addExperienceProject(experienceIndex)}
                />
                {experienceItem.projects?.map(
                  (projectItem: ProjectDto, projectIndex: number) => (
                    <AccordionPlus
                      title={projectItem.title ?? "New project"}
                      classes={{
                        summary: styles.pruneTitle,
                        details: styles.docAccordionDetails,
                      }}
                      onClickDeleteIcon={() =>
                        onChange(
                          `experience[${experienceIndex}].projects`,
                          experienceItem.projects?.filter(
                            (_: ProjectDto, i: number) => i !== projectIndex
                          )
                        )
                      }
                      key={projectIndex}
                    >
                      <Stack
                        className={styles.documentAccordion}
                        sx={{ alignItems: "stretch" }}
                      >
                        <TextField
                          key="experience-project-title"
                          label="Project"
                          value={projectItem.title}
                          onChange={(e) =>
                            onChange(
                              `experience[${experienceIndex}].projects[${projectIndex}].title`,
                              e.target.value
                            )
                          }
                          variant="standard"
                          required
                          focused={(projectItem.title?.length ?? 0) > 0}
                        />
                        <TextField
                          key="experience-project-client"
                          label="Client"
                          value={projectItem.client}
                          onChange={(e) =>
                            onChange(
                              `experience[${experienceIndex}].projects[${projectIndex}].client`,
                              e.target.value
                            )
                          }
                          variant="standard"
                          required
                          focused={(projectItem.client?.length ?? 0) > 0}
                        />
                        <PeriodInput
                          start={{
                            label: "Start",
                            value: projectItem.start,
                            onChange: (e) =>
                              onChange(
                                `experience[${experienceIndex}].projects[${projectIndex}].start`,
                                e
                              ),
                          }}
                          finish={{
                            label: "Finish",
                            value: projectItem.finish,
                            onChange: (e) =>
                              onChange(
                                `experience[${experienceIndex}].projects[${projectIndex}].finish`,
                                e
                              ),
                          }}
                        />
                        <TextField
                          key="experience-project-description"
                          label="Description"
                          value={projectItem.description}
                          onChange={(e) =>
                            onChange(
                              `experience[${experienceIndex}].projects[${projectIndex}].description`,
                              e.target.value
                            )
                          }
                          variant="standard"
                          required
                          focused={(projectItem.description?.length ?? 0) > 0}
                          multiline
                        />
                        <ParagraphTitle
                          title="Roles"
                          buttonCaption="Add role"
                          variant="h4"
                          onClick={() =>
                            addExperienceProjectRole(
                              experienceIndex,
                              projectIndex
                            )
                          }
                        />
                        {projectItem.roles?.map(
                          (roleItem: RoleDto, roleIndex: number) => (
                            <ListItemInput
                              key={`experience-project-role-${roleIndex}`}
                              label="Project"
                              value={roleItem.title ?? ""}
                              onChange={(e) =>
                                onChange(
                                  `experience[${experienceIndex}].projects[${projectIndex}].roles[${roleIndex}].title`,
                                  e.target.value
                                )
                              }
                              onDelete={() =>
                                onChange(
                                  `experience[${experienceIndex}].projects[${projectIndex}].roles`,
                                  projectItem.roles?.filter(
                                    (_: RoleDto, i: number) => i !== roleIndex
                                  )
                                )
                              }
                              required
                              multiline
                            />
                          )
                        )}
                        {!!projectItem.roles?.length && (
                          <AddButton
                            title="Add role"
                            onClick={() =>
                              addExperienceProjectRole(
                                experienceIndex,
                                projectIndex
                              )
                            }
                          />
                        )}
                        <ParagraphTitle
                          title="Achievements"
                          buttonCaption="Add achievement"
                          variant="h4"
                          onClick={() =>
                            addExperienceProjectAchievement(
                              experienceIndex,
                              projectIndex
                            )
                          }
                        />
                        {projectItem.achievements?.map(
                          (
                            achievementItem: ProjectAchievementDto,
                            achievementIndex: number
                          ) => (
                            <ListItemInput
                              key={`experience-project-achievement-${achievementIndex}`}
                              label="Achievement"
                              value={achievementItem.achievement ?? ""}
                              onChange={(e) =>
                                onChange(
                                  `experience[${experienceIndex}].projects[${projectIndex}].achievements[${achievementIndex}].title`,
                                  e.target.value
                                )
                              }
                              onDelete={() =>
                                onChange(
                                  `experience[${experienceIndex}].projects[${projectIndex}].achievements`,
                                  projectItem.achievements?.filter(
                                    (_: ProjectAchievementDto, i: number) =>
                                      i !== achievementIndex
                                  )
                                )
                              }
                              required
                              multiline
                            />
                          )
                        )}
                        {!!projectItem.achievements?.length && (
                          <AddButton
                            title="Add achievement"
                            onClick={() =>
                              addExperienceProjectAchievement(
                                experienceIndex,
                                projectIndex
                              )
                            }
                          />
                        )}
                        <Typography variant="h4">Skills</Typography>
                        <Autocomplete
                          multiple
                          id="fixed-tags-demo"
                          // value={value}
                          // onChange={(event, newValue) => {
                          //   setValue([
                          //     ...fixedOptions,
                          //     ...newValue.filter(
                          //       (option) => fixedOptions.indexOf(option) === -1
                          //     ),
                          //   ]);
                          // }}
                          options={skills}
                          getOptionLabel={(option) => option.title}
                          renderTags={(skillValue, getSkillProps) =>
                            skillValue.map((option, index) => {
                              const { key, ...skillProps } = getSkillProps({
                                index,
                              });
                              return (
                                <Chip
                                  key={key}
                                  label={option.title}
                                  {...skillProps}
                                  // disabled={fixedOptions.indexOf(option) !== -1}
                                />
                              );
                            })
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Skills"
                              placeholder="Choose skill"
                            />
                          )}
                        />
                      </Stack>
                    </AccordionPlus>
                  )
                )}
                {!!experienceItem.projects?.length && (
                  <AddButton
                    title="Add project"
                    onClick={() => addExperienceProject(experienceIndex)}
                  />
                )}
              </Stack>
            </AccordionPlus>
          )
        )}
        {
          <AddButton
            title="Add experience"
            onClick={() =>
              onChange(
                `experience[${formikValidationSchema.values.experience?.length}]`,
                {
                  id: 0,
                }
              )
            }
          />
        }
      </Stack>
    </Box>
  );
}
