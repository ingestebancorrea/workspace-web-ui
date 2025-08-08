import { useSnackbar } from "notistack";

export const useAlerts = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleClickAlert = ({ message, options }) => {
        enqueueSnackbar(message, {
            variant: options && options.variant ? options.variant : "default",
            anchorOrigin: options && options.anchorOrigin ? options.anchorOrigin : {
                vertical: "top",
                horizontal: "right",
            },
        });
    };

    return {
        handleClickAlert,
    };
};