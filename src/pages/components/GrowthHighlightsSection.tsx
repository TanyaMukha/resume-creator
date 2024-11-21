import { FieldArray, useFormikContext } from "formik";
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DragHandle as DragHandleIcon,
} from "@mui/icons-material";
import { ResumeDto } from "../../database/models/Dto";

export const GrowthHighlightsSection = () => {
  const { values, setFieldValue } = useFormikContext<ResumeDto>();

  const handleReorder = (oldIndex: number, newIndex: number) => {
    const highlights = [...(values.growth_highlights || [])];
    const [removed] = highlights.splice(oldIndex, 1);
    highlights.splice(newIndex, 0, removed);
    
    // Обновляем display_order
    highlights.forEach((highlight, index) => {
      highlight.display_order = index;
    });

    setFieldValue('growth_highlights', highlights);
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Professional Growth Highlights</Typography>
        <FieldArray name="growth_highlights">
          {({ push, remove }) => (
            <>
              <IconButton
                color="primary"
                onClick={() =>
                  push({
                    id: 0,
                    resume_id: values.id,
                    highlight_text: "",
                    display_order: values.growth_highlights?.length || 0,
                    created_at: new Date().toISOString(),
                  })
                }
              >
                <AddIcon />
              </IconButton>
              
              <Box sx={{ mt: 1 }}>
                {values.growth_highlights?.map((highlight, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{ cursor: "grab" }}
                    >
                      <DragHandleIcon />
                    </IconButton>
                    
                    <TextField
                      fullWidth
                      size="small"
                      value={highlight.highlight_text}
                      onChange={(e) =>
                        setFieldValue(
                          `growth_highlights.${index}.highlight_text`,
                          e.target.value
                        )
                      }
                      placeholder="Enter growth highlight"
                    />
                    
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => remove(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </FieldArray>
      </Box>
    </Paper>
  );
};