import { Avatar, Box, Divider, Typography } from "@mui/material";

export const MessageCard = ({ message }) => {

    const formattedDate = new Date(message.date).toLocaleString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <Box component="div" sx={{ paddingTop: 2, flexDirection: "column" }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                    <Avatar
                        alt="Descripción de la imagen"
                        src="https://static.vecteezy.com/system/resources/previews/018/765/757/non_2x/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                        sx={{ width: '40px', height: '40px', mr: 1 }} // Espaciado a la derecha del Avatar
                    />
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", width: "100%" }}>
                        <Typography variant="body1">{message.user.name}</Typography>
                        {message.user.role === 'Moderador' && (
                            <Typography variant="body2" sx={{ ml: 1, mt: 0.2, color: 'gray' }}>
                                (Moderador)
                            </Typography>
                        )}
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ color: 'gray', mt: 0.5 }}>
                            {formattedDate}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Typography variant="body2" sx={{ mt: 1 }}>{message.message}</Typography>
            <Divider sx={{ mt: 1 }} />
        </Box>
    );
};