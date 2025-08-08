import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, Link as RouterLink, useLocation } from 'react-router-dom';
import { Button, Grid, TextField, Typography, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { AuthLayout } from '../layout/AuthLayout';
import { FacebookComponent, GoogleComponent } from '../components';
import { useAxiosPost } from '../../hooks/usePostAxios';
import { Loader } from '../../components/Loader';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth';
import roles from '../../data/roles';

export const RegisterPage = () => {
  const url = `${import.meta.env.VITE_API_URL}/auth/register`;
  const dispatch = useDispatch();
  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const { postData, isLoading, data: response } = useAxiosPost();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordValue = watch('password', '');

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    const { name, username, password, confirmPassword, role } = data;
    if (password !== confirmPassword) return;
    await postData(url, { name, username, password, role });
  };

  useEffect(() => {
    if (response && response.ok) {
      const { id, username, name, token } = response.data;
      dispatch(login({ id, username, name, token }));
      localStorage.setItem('token', token);
    }
  }, [response]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthLayout title='Crear Cuenta'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Nombre completo es requerido' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre completo"
                  type="text"
                  placeholder="Nombre completo"
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
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: 'Username es requerido', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo no es válido' } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo"
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
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: 'Selecciona un rol' }}
              render={({ field }) => (
                <FormControl fullWidth sx={{ width: '280px' }} error={!!errors.role}>
                  <InputLabel id="role-label">Rol</InputLabel>
                  <Select
                    {...field}
                    labelId="role-label"
                    label="Rol"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.value || role.id} value={role.value}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.role && (
                    <Typography variant="caption" color="error">
                      {errors.role.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: 'Contraseña es requerida',
                minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
              }}
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
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: 'Confirma tu contraseña',
                validate: value =>
                  value === passwordValue || 'Las contraseñas no coinciden'
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirmar contraseña"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu contraseña"
                  fullWidth
                  sx={{ width: '280px' }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ bgcolor: 'rgba(225, 17 , 28, 1)', width: '280px', color: 'white' }}
            >
              Crear cuenta
            </Button>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }} />

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
}