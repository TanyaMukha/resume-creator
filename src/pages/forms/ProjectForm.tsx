import { FC } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Stack,
  Card,
  CardContent,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  BusinessCenter as BusinessCenterIcon,
} from "@mui/icons-material";
import { DeliverableForm } from "./DeliverableForm";
import { ProjectDto, SkillDto } from "../../database/models/Dto";
import { DATE_FOR_PERIOD_FORMAT } from "../../helpers/constants";
import { useProjectDeliverables } from "../../hooks/useProjectDeliverables";
import { useHardSkills } from "../../hooks/useHardSkills";
import { useProjectSkills } from "../../hooks/useProjectSkills";

interface ProjectFormProps {
  project: ProjectDto;
  experienceIndex: number;
  projectIndex: number;
  onChange: (field: string, arg: unknown) => void;
  onDelete: () => void;
}

export const ProjectForm: FC<ProjectFormProps> = ({
  project,
  experienceIndex,
  projectIndex,
  onChange,
  onDelete,
}) => {
  const hardSkills = useHardSkills();

  const { handleAddProjectDeliverable, handleDeleteProjectDeliverable } =
    useProjectDeliverables(project, projectIndex, experienceIndex, onChange);

  const { handleChangeProjectSkills } = useProjectSkills(
    experienceIndex,
    projectIndex,
    hardSkills,
    project,
    onChange
  );

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
              <BusinessCenterIcon color="primary" />
              <TextField
                fullWidth
                label="Project Title"
                value={project.title}
                onChange={(e) =>
                  onChange(
                    `experience[${experienceIndex}].projects[${projectIndex}].title`,
                    e.target.value
                  )
                }
              />
              <Tooltip title="Delete project">
                <IconButton color="error" onClick={onDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Client"
              value={project.client}
              onChange={(e) =>
                onChange(
                  `experience[${experienceIndex}].projects[${projectIndex}].client`,
                  e.target.value
                )
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Description"
              value={project.description}
              onChange={(e) =>
                onChange(
                  `experience[${experienceIndex}].projects[${projectIndex}].description`,
                  e.target.value
                )
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={
                  dayjs(project.start, DATE_FOR_PERIOD_FORMAT).isValid()
                    ? dayjs(project.start, DATE_FOR_PERIOD_FORMAT)
                    : null
                }
                onChange={(e) =>
                  onChange(
                    `experience[${experienceIndex}].projects[${projectIndex}].start`,
                    e
                  )
                }
                format={DATE_FOR_PERIOD_FORMAT}
                views={["year", "month"]}
                sx={{ width: "100%" }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={
                  dayjs(project.finish, DATE_FOR_PERIOD_FORMAT).isValid()
                    ? dayjs(project.finish, DATE_FOR_PERIOD_FORMAT)
                    : null
                }
                onChange={(e) =>
                  onChange(
                    `experience[${experienceIndex}].projects[${projectIndex}].finish`,
                    e
                  )
                }
                format={DATE_FOR_PERIOD_FORMAT}
                views={["year", "month"]}
                sx={{ width: "100%" }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Deliverables</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {/* <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle2">Tasks</Typography>
                      <Button
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={handleAddProjectTask}
                      >
                        Add Task
                      </Button>
                    </Box>
                    <Stack spacing={1}>
                      {project.tasks?.map((task, taskIndex) => (
                        <TaskForm
                          key={task.id}
                          task={task}
                          onChange={(e) =>
                            onChange(
                              `experience[${experienceIndex}].projects[${projectIndex}].tasks[${taskIndex}].description`,
                              e.target.value
                            )
                          }
                          onDelete={() => handleDeleteProjectTask(taskIndex)}
                        />
                      ))}
                    </Stack>
                  </Box> */}

                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle2">Deliverables</Typography>
                      <Button
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={handleAddProjectDeliverable}
                      >
                        Add Deliverable
                      </Button>
                    </Box>
                    <Stack spacing={1}>
                      {project.deliverables?.map(
                        (deliverable, deliverableIndex) => (
                          <DeliverableForm
                            key={deliverable.id}
                            deliverable={deliverable}
                            onChange={(e) =>
                              onChange(
                                `experience[${experienceIndex}].projects[${projectIndex}].deliverables[${deliverableIndex}].title`,
                                e.target.value
                              )
                            }
                            onDelete={() =>
                              handleDeleteProjectDeliverable(deliverableIndex)
                            }
                          />
                        )
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={hardSkills}
              value={project.hard_skills || []}
              onChange={(_, newValue) => handleChangeProjectSkills(newValue)}
              getOptionLabel={(option) => (option as SkillDto).title}
              isOptionEqualToValue={(option, value) =>
                (option as SkillDto).title === value.title
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  placeholder="Add skills"
                />
              )}
              freeSolo
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
