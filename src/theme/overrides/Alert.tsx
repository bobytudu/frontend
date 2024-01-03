import { ComponentsOverridesProps } from ".";

export default function Alert(theme: ComponentsOverridesProps) {
  return {
    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          backgroundColor: "#487D0A",
        },
        filledWarning: {
          backgroundColor: "#CF9C08",
        },
      },
    },
  };
}
