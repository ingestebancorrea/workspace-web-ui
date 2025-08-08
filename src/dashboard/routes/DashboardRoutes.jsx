import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, UserPage } from "../pages";
import { DashboardLayout } from "../layout/DashboardLayout";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
