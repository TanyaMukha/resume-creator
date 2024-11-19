import React from "react";
import {
  Box,
  Grid,
  TextField,
  IconButton,
  Card,
  CardContent,
  Tooltip,
  Chip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import {
  Delete as DeleteIcon,
  Verified as VerifiedIcon,
  Link as LinkIcon,
} from "@mui/icons-material";
import { CertificateDto } from "../../database/models/Dto";
import { DATE_FOR_PERIOD_FORMAT } from "../../helpers/constants";

interface CertificateFormProps {
  certificate: CertificateDto;
  index: number;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onDelete: () => void;
}

export const CertificateForm: React.FC<CertificateFormProps> = ({
  certificate,
  index,
  onChange,
  onDelete,
}) => {
  const isExpired = certificate.finish
    ? certificate.finish < new Date().getFullYear()
    : false;

  return (
    <Card
      sx={{
        "&:hover": { boxShadow: 2 },
        transition: "box-shadow 0.3s ease-in-out",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          {/* Title with delete button */}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 1 }}
          >
            <TextField
              fullWidth
              label="Certificate Title"
              value={certificate.title}
              onChange={(e) =>
                onChange(`certificates[${index}].title`, e.target.value)
              }
              placeholder="e.g., AWS Certified Solutions Architect"
              required
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, pt: 1 }}>
              {isExpired && <Chip label="Expired" color="error" size="small" />}
              {certificate.credentialId && (
                <Tooltip title="Verified Certificate">
                  <VerifiedIcon color="primary" />
                </Tooltip>
              )}
              <IconButton color="error" onClick={onDelete} size="small">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Issuing Organization"
              value={certificate.issuer}
              onChange={(e) =>
                onChange(`certificates[${index}].issuer`, e.target.value)
              }
              placeholder="e.g., Amazon Web Services"
            />
          </Grid>

          {/* Dates and Type in one row */}
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Issue Date"
                value={
                  dayjs(certificate.start, DATE_FOR_PERIOD_FORMAT).isValid()
                    ? dayjs(certificate.start, DATE_FOR_PERIOD_FORMAT)
                    : null
                }
                onChange={(e) =>
                  onChange(
                    `certificates[${index}].start`,
                    e?.format(DATE_FOR_PERIOD_FORMAT)
                  )
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
                label="Expiration Date"
                value={
                  dayjs(certificate.finish, DATE_FOR_PERIOD_FORMAT).isValid()
                    ? dayjs(certificate.finish, DATE_FOR_PERIOD_FORMAT)
                    : null
                }
                onChange={(e) =>
                  onChange(
                    `certificates[${index}].finish`,
                    e?.format(DATE_FOR_PERIOD_FORMAT)
                  )
                }
                format={DATE_FOR_PERIOD_FORMAT}
                views={["year", "month"]}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Certificate Type"
              select
              value={certificate.type || "certification"}
              onChange={(e) =>
                onChange(`certificates[${index}].type`, e.target.value)
              }
              SelectProps={{
                native: true,
              }}
            >
              <option value="certification">Certification</option>
              <option value="course">Course</option>
              <option value="diploma">Diploma</option>
              <option value="other">Other</option>
            </TextField>
          </Grid>

          {/* Full width fields */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Credential ID"
              value={certificate.credentialId}
              onChange={(e) =>
                onChange(`certificates[${index}].credentialId`, e.target.value)
              }
              placeholder="Enter credential ID if available"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Certificate URL"
              value={certificate.link}
              onChange={(e) =>
                onChange(`certificates[${index}].link`, e.target.value)
              }
              placeholder="Enter URL to verify certificate"
              InputProps={{
                endAdornment: certificate.link && (
                  <Tooltip title="Open certificate">
                    <IconButton
                      edge="end"
                      onClick={() => window.open(certificate.link, "_blank")}
                    >
                      <LinkIcon />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
