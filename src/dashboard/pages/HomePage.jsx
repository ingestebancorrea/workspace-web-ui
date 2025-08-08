import { useCallback, useEffect, useState } from "react";
import { Typography, Box, Paper, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFetchData } from "../../hooks/useFetchData";
import { ProjectModal } from "../components/ProjectModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskModal } from "../components/TaskModal";
import { columns } from "../../data/columns";

export const HomePage = () => {
  const url = `${import.meta.env.VITE_API_URL}/task?idProject=2`;
  const { fetchData, data: responseFecth } = useFetchData();
  const { error } = useFetchData();
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
  });

  const refreshTasks = useCallback(() => {
    fetchData(url);
  }, [fetchData, url]);

  useEffect(() => {
    refreshTasks();
  }, []);

  useEffect(() => {
    if (responseFecth && responseFecth.ok && Array.isArray(responseFecth.data)) {
      const groupedTasks = {
        backlog: [],
        todo: [],
        inProgress: [],
        done: [],
      };

      responseFecth.data.forEach((task) => {
        const statusKey = task.status.toLowerCase().replace(/\s/g, "");
        if (groupedTasks[statusKey]) {
          groupedTasks[statusKey].push({
            id: String(task.id),
            content: task.title,
          });
        }
      });

      setTasks(groupedTasks);
    }
  }, [responseFecth]);

  const handleCreateProject = () => {
    setOpenProjectModal(true);
  };

  const handleCreateTask = () => {
    setOpenTaskModal(true);
  };

  const handleCloseProjectModal = () => {
    setOpenProjectModal(false);
  };

  const handleCloseTaskModal = () => {
    setOpenTaskModal(false);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(tasks[source.droppableId]);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);

      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: items,
      }));
    } else {
      const sourceItems = Array.from(tasks[source.droppableId]);
      const [moved] = sourceItems.splice(source.index, 1);
      const destItems = Array.from(tasks[destination.droppableId]);
      destItems.splice(destination.index, 0, moved);

      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      }));
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          onClick={handleCreateProject}
          sx={{
            backgroundColor: "green",
            borderRadius: "50%",
            minWidth: "50px",
            height: "50px",
            fontSize: "24px",
            padding: 0,
            "&:hover": {
              backgroundColor: "darkgreen",
            },
            color: "white",
          }}
        >
          +
        </Button>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <Paper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    flex: "0 0 250px",
                    p: 2,
                    backgroundColor: "#f4f4f4",
                    borderRadius: 2,
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">{column.title}</Typography>

                    {column.id === "backlog" && (
                      <IconButton
                        size="small"
                        onClick={handleCreateTask}
                        sx={{
                          backgroundColor: "blue",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "darkblue",
                          },
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>

                  {tasks[column.id].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <Paper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            p: 2,
                            mb: 1.5,
                            backgroundColor: "white",
                            borderRadius: 1,
                            boxShadow: 1,
                          }}
                        >
                          {task.content}
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Paper>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>

      <ProjectModal open={openProjectModal} handleClose={handleCloseProjectModal} />

      <TaskModal
        open={openTaskModal}
        handleClose={handleCloseTaskModal}
        onTaskCreated={refreshTasks}
      />
    </>
  );
};
