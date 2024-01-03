import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import { SnackState } from "redux/reducers/snack.reducer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// const Alert = React.forwardRef(function Alert(props: MuiAlertProps, ref: any) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

interface AlertProps {
  showAlert: SnackState;
  setShowAlert: React.Dispatch<React.SetStateAction<SnackState>>;
}
export default function AlertComp({ showAlert, setShowAlert }: AlertProps) {
  const { open, message, severity } = showAlert;
  const handleClose = (...args: any) => {
    if (args[1] && args[1] === "clickaway") return;
    setShowAlert({
      open: false,
      message: "",
      severity: "success",
    });
  };
  function slideTransition(props: SlideProps) {
    return <Slide {...props} direction="left" />;
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={5000}
      TransitionComponent={slideTransition}
      onClose={(...args) => handleClose(...args)}
    >
      {severity && message ? (
        <Alert
          variant="filled"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          severity={severity}
          sx={{ width: "100%", color: "white" }}
        >
          {message}
        </Alert>
      ) : (
        <></>
      )}
    </Snackbar>
  );
}
