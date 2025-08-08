import { 
    Box, List, ListItem, ListItemButton, 
    ListItemIcon, ListItemText, Collapse 
} from "@mui/material";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchData } from "../../hooks/useFetchData";

export const SideBar = () => {
    const url = `${import.meta.env.VITE_API_URL}/project`;
    const { fetchData, data: responseFecth } = useFetchData();
    const navigate = useNavigate();

    const [openProjects, setOpenProjects] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const toggleProjects = () => {
        setOpenProjects(!openProjects);
    };

    useEffect(() => {
        const fetchProjectData = async () => {
            await fetchData(url);
        };

        fetchProjectData();
    }, []);

    return (
        <Box
            component="div"
            sx={{
                width: 240,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f5f5f5',
                height: '100vh',
                borderRight: '1px solid #ddd',
            }}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={toggleProjects}>
                        <ListItemIcon>
                            <WorkspacesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Proyectos" />
                        {openProjects ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>

                <Collapse in={openProjects} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {responseFecth?.data?.map((project) => (
                            <ListItem key={project.id} disablePadding>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleNavigation(`/project/${project.id}`)}
                                >
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={project.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation("/users")}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
};
