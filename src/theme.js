import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00677F",
    },
    secondary: {
      main: "#000000",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "var1" },
          style: {
            backgroundColor: "transparent",
            color: "grey",
            textTransform: "none",
            "&:hover": {
              color: "black",
              fontWeight: "bold",
              border: "1px solid black",
              backgroundColor: "lightgrey",
            },
            border: "1px solid gray",
            borderRadius: "0px",
            height: "40px",
          },
        },
        {
          props: { variant: "var2" },
          style: {
            backgroundColor: "",
            color: "",
            textTransform: "none",
            "&:hover": {},
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: "none",
        }
      }
    },
  },
});
