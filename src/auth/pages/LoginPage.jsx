import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Link, Link as RouterLink } from "react-router-dom";
import { Button, Grid, TextField, IconButton } from "@mui/material";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { AuthLayout } from "../layout/AuthLayout";
import { useAxiosPost } from "../../hooks/usePostAxios";
import { Loader } from "../../components/Loader";
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth';

export const LoginPage = () => {
  const url = `${import.meta.env.VITE_API_URL}/auth/login`;
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { postData, isLoading, data: response } = useAxiosPost();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const { username, password } = data;
    await postData(url, { username, password });
  };

  useEffect(() => {
    if (response && response.ok) {
      const { id, username, name, token } = response.data;
      dispatch(login({ id, username, name, token }));
      localStorage.setItem('token', token);
    }
  }, [response]);
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthLayout title="Log In">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: 'Username es requerido', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo no es válido' } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  type="email"
                  placeholder="correo@gmail.com"
                  fullWidth
                  sx={{ width: '280px' }}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Contraseña es requerida', minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  fullWidth
                  sx={{ width: '280px' }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
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
              Login
            </Button>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }} />

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};