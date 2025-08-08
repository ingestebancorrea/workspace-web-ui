import { Grid, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";
import { Main } from "../components/Main";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  const drawerWidth = 0;

  return (
    <Grid container sx={{ minHeight: '100vh', backgroundColor: 'primary.main' }}>
      
      {/* Navbar */}
      <Grid item xs={12}>
        <NavBar drawerWidth={drawerWidth} />
        <Toolbar />
      </Grid>

      <Grid container sx={{ flex: 1 }}>
        {/* Sidebar */}
        <Grid item>
          <SideBar />
        </Grid>

        {/* Main */}
        <Grid item sx={{ flex: 1 }}>
          <Main>
            <Outlet />
          </Main>
        </Grid>
      </Grid>
    </Grid>
  );
};
