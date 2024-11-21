import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Menu,
  MenuItem,
  Chip,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Link,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  FileCopy as FileCopyIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Work as WorkIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { BlobProvider } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { PositionDto, ResumeDto } from "../../database/models/Dto";
import { PDFTemplate } from "../../templates/SimpleCVTemplate/PDFTemplate";

interface ResumeCardProps {
  position: PositionDto;
  resume: ResumeDto;
  onDelete: (id: number) => void;
  onEdit: (position: PositionDto) => void;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({
  position,
  resume,
  onDelete,
  onEdit,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(position);
    handleClose();
  };

  const handleCopy = () => {
    handleClose();
  };

  const handleDelete = () => {
    onDelete(position.id);
    handleClose();
  };

  const getFileName = () => {
    const formattedTitle = position.title.toLowerCase().replace(/\s+/g, "-");
    return `resume-${formattedTitle}.pdf`;
  };

  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreviewOpen = () => {
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            boxShadow: 6,
            transition: "box-shadow 0.3s ease-in-out",
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6" component="h2" gutterBottom>
                {position.title}
              </Typography>
              {!!position.salary && (
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <WorkIcon sx={{ fontSize: 20 }} />$
                  {position.salary?.toLocaleString()}
                </Typography>
              )}
            </Box>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>

          <Typography
            variant="body1"
            component="h3"
            fontWeight="bold"
            gutterBottom
          >
            Professional Summary
          </Typography>
          {position.summary && (
            <Typography
              color="text.secondary"
              sx={{
                mb: 2,
                display: "-webkit-box",
                // WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {position.summary}
            </Typography>
          )}

          <Typography
            variant="body1"
            component="h3"
            fontWeight="bold"
            gutterBottom
          >
            Career Objective
          </Typography>
          {position.objective && (
            <Typography
              color="text.secondary"
              sx={{
                mb: 2,
                display: "-webkit-box",
                // WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {position.objective}
            </Typography>
          )}

          {position.hard_skills && position.hard_skills.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {position.hard_skills
                .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                // .slice(0, 3)
                .map((skill) => (
                  <Chip
                    key={skill.id}
                    label={skill.title}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              {/* {position.hard_skills.length > 3 && (
                <Chip
                  label={`+${position.hard_skills.length - 3}`}
                  size="small"
                  variant="outlined"
                />
              )} */}
            </Box>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => onEdit(position)}
            variant="contained"
          >
            Edit
          </Button>
          <BlobProvider
            document={<PDFTemplate resume={resume} position={position} />}
          >
            {({ url, loading, error }) => (
              <Button
                size="small"
                startIcon={<DownloadIcon />}
                variant="outlined"
                disabled={loading}
                href={url || ""}
                download={getFileName()}
              >
                {loading ? "Loading..." : "PDF"}
              </Button>
            )}
          </BlobProvider>
          <Button
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={handlePreviewOpen}
            variant="outlined"
          >
            Preview
          </Button>
        </CardActions>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem onClick={handleCopy}>
            <FileCopyIcon sx={{ mr: 1 }} /> Make a copy
          </MenuItem>
          <MenuItem>
            <BlobProvider
              document={<PDFTemplate resume={resume} position={position} />}
            >
              {({ url, loading, error }) => (
                <Link
                  href={url || ""}
                  download={getFileName()}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <DownloadIcon sx={{ mr: 1 }} />
                  {loading ? "Preparing PDF..." : "Download PDF"}
                </Link>
              )}
            </BlobProvider>
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
            <DeleteIcon sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>
      </Card>
      <Dialog fullScreen open={previewOpen} onClose={handlePreviewClose}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handlePreviewClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Preview Resume
            </Typography>
            <BlobProvider
              document={<PDFTemplate resume={resume} position={position} />}
            >
              {({ url, loading, error }) => (
                <Link
                  href={url || ""}
                  download={getFileName()}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Button
                    color="inherit"
                    startIcon={<DownloadIcon />}
                    disabled={loading}
                  >
                    {loading ? "Preparing..." : "Download PDF"}
                  </Button>
                </Link>
              )}
            </BlobProvider>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            height: "calc(100vh - 64px)",
            bgcolor: "grey.100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "white",
              boxShadow: 1,
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <PDFViewer
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            >
              <PDFTemplate resume={resume} position={position} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
