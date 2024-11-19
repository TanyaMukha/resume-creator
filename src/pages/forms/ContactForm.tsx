import { FC } from "react";
import {
  TextField,
  Grid,
  IconButton,
  MenuItem,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { ContactDto } from "../../database/models/Dto";
import { ContactType } from "../../database/models/enums";

interface ContactFormProps {
  contact: ContactDto;
  index: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onDelete: () => void;
}

export const ContactForm: FC<ContactFormProps> = ({
  contact,
  index,
  onChange,
  onDelete,
}) => {
  return (
    <Card
      sx={{
        position: "relative",
        "&:hover": { boxShadow: 2 },
        transition: "box-shadow 0.3s ease-in-out",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <TextField
              select
              fullWidth
              label="Type"
              value={contact.type}
              onChange={(e) =>
                onChange(
                  `contacts[${index}].type`,
                  ContactType[e.target.value as keyof typeof ContactType]
                )
              }
            >
              {Object.values(ContactType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Title"
              value={contact.title}
              onChange={(e) =>
                onChange(`contacts[${index}].title`, e.target.value)
              }
              placeholder="e.g., Work Email, Personal Phone"
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Value"
              value={contact.value}
              onChange={(e) =>
                onChange(`contacts[${index}].value`, e.target.value)
              }
              placeholder="Enter contact value"
            />
          </Grid>
          <Grid item xs={12} md={1}>
            <TextField
              fullWidth
              type="number"
              label="Order"
              value={contact.display_order || 0}
              onChange={(e) =>
                onChange(`contacts[${index}].display_order`, e.target.value)
              }
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tooltip title="Delete contact">
              <IconButton color="error" onClick={onDelete} size="large">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
