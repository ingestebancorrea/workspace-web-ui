import { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Button, Dialog, DialogContent, DialogTitle, TextField, Box, Grid } from '@mui/material';
import { Loader } from '../../components/Loader';
import { useAxiosPost } from '../../hooks/usePostAxios';

export const TaskModal = ({ open, handleClose, onTaskCreated }) => {
  const url = `${import.meta.env.VITE_API_URL}/task`;
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const { postData, isLoading, data: response } = useAxiosPost();

  const onSubmit = async (data) => {
    await postData(url, { 
      ...data,
      status: "Backlog",
      project_id: 2,
      limit_date: data.limit_date || null
    });
  };

  useEffect(() => {
    if (response && response.ok) {
      reset();
      handleClose();
      if (typeof onTaskCreated === 'function') {
        onTaskCreated();
      }
    }
  }, [response]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crear Tarea</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: 'El título es requerido' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Título de la tarea"
                    placeholder="Ingresa el título"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    sx={{ width: '280px' }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{ required: 'La descripción es requerida' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descripción"
                    placeholder="Describe la tarea"
                    multiline
                    rows={3}
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    sx={{ width: '280px' }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="limit_date"
                control={control}
                defaultValue=""
                rules={{ required: 'La fecha límite es requerida' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha límite"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.limit_date}
                    helperText={errors.limit_date?.message}
                    sx={{ width: '280px' }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "rgba(225, 17 , 28, 1)",
                  color: "white",
                  width: "280px",
                }}
              >
                Crear
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
