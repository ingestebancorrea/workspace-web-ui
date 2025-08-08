import { Grid, CircularProgress } from "@mui/material";

export const Loader = () => {
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <CircularProgress />
        </Grid>
    );
}
