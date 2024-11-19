import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Fab,
  Tooltip,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";
import { PositionDto } from "../database/models/Dto";
import { PositionForm } from "./forms/PositionForm";
import { FormikProps } from "formik";
import { ResumeCard } from "./components/ResumeCard";
import { useResumePositions } from "../hooks/useResumePositions";

interface HomePageProps {
  schema: FormikProps<any>;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onSave: () => void;
}

export const HomePage: FC<HomePageProps> = ({
  schema,
  onChange,
  onBlur,
  onSave,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPositions, setFilteredPositions] = useState<
    { position: PositionDto; positionIndex: number }[]
  >([]);
  const [draftPosition, setDraftPosition] = useState<PositionDto | null>(null);
  const [editingPositionIndex, setEditingPositionIndex] = useState<
    number | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleAddPosition, handleDeletePosition, handleUpdatePosition } =
    useResumePositions({
      positions: schema.values?.positions,
      onChange,
    });

  const handleSetFilteredPosition = () =>
    setFilteredPositions(
      schema.values?.positions
        ?.map((item: PositionDto, index: number) => {
          return { position: item, positionIndex: index };
        })
        .filter(
          (item: { position: PositionDto; positionIndex: number }) =>
            item.position.title
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            item.position.summary
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            item.position.hard_skills?.some((skill) =>
              skill.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    );

  useEffect(() => {
    handleSetFilteredPosition();
  }, [searchTerm, schema.values.positions]);

  useEffect(() => {
    handleSetFilteredPosition();
  }, []);

  const handleModalAddPosition = () => {
    setDraftPosition(null);
    setEditingPositionIndex(schema.values.positions?.length ?? 0);
    setIsModalOpen(true);
    handleAddPosition();
  };

  const handleEdit = (position: PositionDto, index: number) => {
    setDraftPosition({ ...position }); // Create a copy
    setEditingPositionIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDraftPosition(null);
    setEditingPositionIndex(null);
  };

  const handleSavePosition = (updatedPosition: PositionDto) => {
    if (editingPositionIndex !== null) {
      handleUpdatePosition(updatedPosition, editingPositionIndex);
      console.log("save", updatedPosition, editingPositionIndex);
    }
    // onSave();
    handleCloseModal();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          maxWidth: 1920,
          mx: "auto",
          width: "100%",
        }}
      >
        <Typography variant="h4" component="h1">
          My Resumes
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Search by title, description or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
          <Tooltip title="Create new resume">
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => handleModalAddPosition()}
              size="medium"
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: 1920,
          mx: "auto",
          width: "100%",
        }}
      >
        {filteredPositions?.length > 0 ? (
          <Grid container spacing={3}>
            {filteredPositions.map(
              (item: { position: PositionDto; positionIndex: number }) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  key={item.positionIndex}
                >
                  <ResumeCard
                    position={item.position}
                    onDelete={handleDeletePosition}
                    onEdit={(e: PositionDto) =>
                      handleEdit(e, item.positionIndex)
                    }
                  />
                </Grid>
              )
            )}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              gap: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              {searchTerm ? "No resumes found" : "Create your first resume"}
            </Typography>
            {!searchTerm && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleModalAddPosition}
              >
                Create Resume
              </Button>
            )}
          </Box>
        )}
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={isModalOpen}>
          <Box
            sx={{
              backgroundColor: "background.paper",
              boxShadow: 24,
              width: "100%",
              maxWidth: "900px",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
              borderRadius: 1,
            }}
          >
            <PositionForm
              mode={draftPosition ? "edit" : "create"}
              position={draftPosition || undefined}
              onSave={(e: PositionDto) => handleSavePosition(e)}
              onClose={handleCloseModal}
              onChange={onChange}
              onBlur={onBlur}
              onDelete={() => {}}
              positionIndex={editingPositionIndex ?? 0}
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
