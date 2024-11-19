import { FC, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Autocomplete,
  Paper,
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as SaveIcon,
  Close as CancelIcon,
} from "@mui/icons-material";
import { SkillGroupDto, SkillDto } from "../database/models/Dto";
import { useSkillGroups } from "../hooks/useSkillGroups";
import { useSkills } from "../hooks/useSkills";
import { GroupForm } from "./forms/SkillGroupForm";

interface SkillGroupsPageProps {
  onSave: () => void;
  onChange: (field: string, arg: unknown) => void;
}

export const SkillGroupsPage: FC<SkillGroupsPageProps> = ({}) => {
  const [editingGroup, setEditingGroup] = useState<SkillGroupDto | null>(
    null
  );
  const [isAddingGroup, setIsAddingGroup] = useState(false);

  const skills = useSkills();
  const groups = useSkillGroups();

  const handleAddGroup = () => {
    setIsAddingGroup(true);
  };

  const handleEditGroup = (group: SkillGroupDto) => {
    setEditingGroup(group);
  };

  const handleSaveGroup = () => {};

  const handleDeleteGroup = () => {
    // if (confirm(`Are you sure you want to delete "${group.title}" group?`)) {
    //   await onDelete(group.id);
    // }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">Skill Groups</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleAddGroup}
          disabled={isAddingGroup}
        >
          Add Group
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            {isAddingGroup && (
              <Paper elevation={1} sx={{ p: 2 }}>
                <GroupForm
                  skills={skills}
                  //   groupSkills={[]}
                  onSave={() => {}}
                  onCancel={() => setIsAddingGroup(false)}
                />
              </Paper>
            )}

            {groups?.map((group) => (
              <Paper key={group.id} elevation={1} sx={{ p: 2 }}>
                {editingGroup?.id === group.id ? (
                  <GroupForm
                    group={group}
                    skills={skills}
                    // groupSkills={skills.filter(
                    //   (skill) => skill.group_id === group.id
                    // )}
                    onSave={() => {}}
                    onCancel={() => setEditingGroup(null)}
                  />
                ) : (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1">{group.title}</Typography>
                      <Box>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleEditGroup(group)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteGroup()}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {skills
                        .filter((skill) => skill.group_id === group.id)
                        .map((skill) => (
                          <Chip
                            key={skill.id}
                            label={skill.title}
                            size="small"
                          />
                        ))}
                    </Box>
                  </Box>
                )}
              </Paper>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
