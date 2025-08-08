import { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Button, Dialog, DialogContent, DialogTitle, TextField, Box, Grid } from '@mui/material';
import { Loader } from '../../components/Loader';
import { useAxiosPost } from '../../hooks/usePostAxios';

export const ProjectModal = ({ open, handleClose }) => {
  const url = `${import.meta.env.VITE_API_URL}/project`;
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const { postData, isLoading, data: response } = useAxiosPost();

  const onSubmit = async (data) => {
    const { name, description } = data;
    await postData(url, { name, description });
  };

  useEffect(() => {
    if (response && response.ok) {
      reset();
      handleClose();
    }
  }, [response, reset]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crear Proyecto</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'El nombre es requerido' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre del proyecto"
                    placeholder="Ingresa el nombre"
                    fullWidth
                    sx={{ width: '280px' }}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{ required: 'La descripción es requerida' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descripción"
                    placeholder="Describe el proyecto"
                    multiline
                    rows={3}
                    fullWidth
                    sx={{ width: '280px' }}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "rgba(225, 17 , 28, 1)",
                  width: "280px",
                  color: "white",
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
