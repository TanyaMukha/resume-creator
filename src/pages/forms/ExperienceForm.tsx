import React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Stack,
  MenuItem,
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
  Work as WorkIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { ExperienceDto, SkillDto } from "../../database/models/Dto";
import { DeliverableForm } from "./DeliverableForm";
import { ProjectForm } from "./ProjectForm";
import { useExperienceDeliverables } from "../../hooks/useExperienceDeliverables";
import { useExperienceProjects } from "../../hooks/useExperienceProjects";
import { DATE_FOR_PERIOD_FORMAT } from "../../helpers/constants";
import { useHardSkills } from "../../hooks/useHardSkills";
import { useExperienceSkills } from "../../hooks/useExperienceSkills";

interface ExperienceFormProps {
  experience: ExperienceDto;
  experienceIndex: number;
  resume_id: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onSave: () => void;
  onDelete: () => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experience,
  experienceIndex,
  onChange,
  onDelete,
}) => {
  const { handleAddDeliverable, handleDeleteDeliverable } =
    useExperienceDeliverables(experience, experienceIndex, onChange);

  const { handleAddProject, handleDeleteProject } = useExperienceProjects(
    experience,
    experienceIndex,
    onChange
  );

  const hardSkills = useHardSkills();

  const { handleChangeExperienceSkills } = useExperienceSkills(
    experienceIndex,
    experience,
    hardSkills,
    onChange
  );

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <WorkIcon color="primary" />
            <TextField
              fullWidth
              label="Position"
              value={experience.position}
              onChange={(e) =>
                onChange(
                  `experience[${experienceIndex}].position`,
                  e.target.value
                )
              }
            />
            <Tooltip title="Delete experience">
              <IconButton color="error" onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Company"
            value={experience.company}
            onChange={(e) =>
              onChange(`experience[${experienceIndex}].company`, e.target.value)
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Location"
            value={experience.location}
            onChange={(e) =>
              onChange(
                `experience[${experienceIndex}].location`,
                e.target.value
              )
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={
                dayjs(experience.start, DATE_FOR_PERIOD_FORMAT).isValid()
                  ? dayjs(experience.start, DATE_FOR_PERIOD_FORMAT)
                  : null
              }
              onChange={(e) =>
                onChange(`experience[${experienceIndex}].start`, e)
              }
              format={DATE_FOR_PERIOD_FORMAT}
              views={["year", "month"]}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={
                dayjs(experience.finish, DATE_FOR_PERIOD_FORMAT).isValid()
                  ? dayjs(experience.finish, DATE_FOR_PERIOD_FORMAT)
                  : null
              }
              onChange={(e) =>
                onChange(`experience[${experienceIndex}].finish`, e)
              }
              format={DATE_FOR_PERIOD_FORMAT}
              views={["year", "month"]}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={experience.description || ""}
            onChange={(e) =>
              onChange(
                `experience[${experienceIndex}].description`,
                e.target.value
              )
            }
          />
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
                      onClick={handleAddTask}
                    >
                      Add Task
                    </Button>
                  </Box>
                  <Stack spacing={1}>
                    {experience.tasks?.map((task, taskIndex: number) => (
                      <TaskForm
                        key={task.id}
                        task={task}
                        onChange={(e) =>
                          onChange(
                            `experience[${experienceIndex}].tasks[${taskIndex}].description`,
                            e.target.value
                          )
                        }
                        onDelete={() => handleDeleteTask(taskIndex)}
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
                      onClick={handleAddDeliverable}
                    >
                      Add Deliverable
                    </Button>
                  </Box>
                  <Stack spacing={1}>
                    {experience.deliverables?.map(
                      (deliverable, deliverableIndex) => (
                        <DeliverableForm
                          key={deliverable.id}
                          deliverable={deliverable}
                          onChange={(e) =>
                            onChange(
                              `experience[${experienceIndex}].deliverables[${deliverableIndex}].deliverable`,
                              e.target.value
                            )
                          }
                          onDelete={() =>
                            handleDeleteDeliverable(deliverableIndex)
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
          <Typography variant="subtitle1" gutterBottom>
            Skills
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Autocomplete
              multiple
              options={hardSkills}
              value={experience?.hard_skills || []}
              onChange={(_, newValue) => handleChangeExperienceSkills(newValue)}
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
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="subtitle1">Projects</Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleAddProject}
            >
              Add Project
            </Button>
          </Box>
          {experience.projects?.map((project, projectIndex) => (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{project?.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ProjectForm
                  key={project.id}
                  project={project}
                  experienceIndex={experienceIndex}
                  projectIndex={projectIndex}
                  onChange={onChange}
                  onDelete={() => handleDeleteProject(projectIndex)}
                />
              </AccordionDetails>
            </Accordion>
          ))}
          {experience.projects?.length === 0 && (
            <Typography color="text.secondary" align="center" py={2}>
              No projects added yet. Click "Add Project" to start.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
