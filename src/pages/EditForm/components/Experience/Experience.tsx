import {
  Autocomplete,
  Box,
  Chip,
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
  ProjectDto,
  SkillDto,
} from "../../../../database/models/Dto";
import { useEffect, useState } from "react";
import { SkillService } from "../../../../database/services/SkillService";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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

  return (
    <Box className={styles.container}>
      <Stack sx={{ alignItems: "center" }}>
        <Typography variant="h2">
          Experience <AddCircleIcon />
        </Typography>
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
                <Stack direction="row" spacing={2}>
                  <TextField
                    key="experience-start"
                    label="Start"
                    value={experienceItem.start}
                    onChange={(e) =>
                      onChange(
                        `experience[${experienceIndex}].start`,
                        e.target.value
                      )
                    }
                    variant="standard"
                    required
                    focused={(experienceItem.start?.length ?? 0) > 0}
                  />
                  <TextField
                    key="experience-finish"
                    label="Finish"
                    value={experienceItem.finish}
                    onChange={(e) =>
                      onChange(
                        `experience[${experienceIndex}].finish`,
                        e.target.value
                      )
                    }
                    variant="standard"
                    required
                    focused={(experienceItem.finish?.length ?? 0) > 0}
                  />
                </Stack>
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
                <Typography variant="h3">
                  Achievements <AddCircleIcon />
                </Typography>
                {experienceItem.achievements?.map(
                  (
                    achieveItem: ExperienceAchievementDto,
                    achieveIndex: number
                  ) => (
                    <TextField
                      key="experience-achievement"
                      label="Achievement"
                      value={achieveItem.achievement}
                      onChange={(e) =>
                        onChange(
                          `experience[${experienceIndex}].achievements[${achieveIndex}].achievement`,
                          e.target.value
                        )
                      }
                      variant="standard"
                      required
                      focused={(achieveItem.achievement?.length ?? 0) > 0}
                      multiline
                    />
                  )
                )}
                <Typography variant="h3">
                  Projects <AddCircleIcon />
                </Typography>
                {experienceItem.projects?.map(
                  (projectItem: ProjectDto, projectIndex: number) => (
                    <AccordionPlus
                      title={`${projectItem.title}` ?? "New project"}
                      classes={{
                        summary: styles.pruneTitle,
                        details: styles.docAccordionDetails,
                      }}
                      onClickDeleteIcon={() =>
                        onChange(
                          `education[${projectIndex}].diploms`,
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
                        <Stack direction="row" spacing={2}>
                          <TextField
                            key="experience-project-start"
                            label="Start"
                            value={projectItem.start}
                            onChange={(e) =>
                              onChange(
                                `experience[${experienceIndex}].projects[${projectIndex}].start`,
                                e.target.value
                              )
                            }
                            variant="standard"
                            required
                            focused={(projectItem.start?.length ?? 0) > 0}
                          />
                          <TextField
                            key="experience-project-finish"
                            label="Finish"
                            value={projectItem.finish}
                            onChange={(e) =>
                              onChange(
                                `experience[${experienceIndex}].projects[${projectIndex}].finish`,
                                e.target.value
                              )
                            }
                            variant="standard"
                            required
                            focused={(projectItem.finish?.length ?? 0) > 0}
                          />
                        </Stack>
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
                        <Typography variant="h4">
                          Roles <AddCircleIcon />
                        </Typography>
                        <Typography variant="h4">
                          Achievements <AddCircleIcon />
                        </Typography>
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
              </Stack>
            </AccordionPlus>
          )
        )}
      </Stack>
    </Box>
  );
}
