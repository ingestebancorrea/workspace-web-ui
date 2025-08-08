import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const grayTheme = createTheme({
    palette: {
        primary: {
            main: '#EBECF0'
        },
        secondary: {
            main: 'rgba(225, 17 , 28, 1)'
        },
        error: {
            main: red.A200
        }
    }
})