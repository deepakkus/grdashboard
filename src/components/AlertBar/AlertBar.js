import React, { useEffect } from "react";
// import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
})); 

export default function AlertBar({
  children,
  onClickFunc,
  verticalInput,
  horizontalInput,
  severity,
  isOpen,
  msg,
  errorMsg,
}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "left",
  });

  useEffect(() => {
    if (verticalInput || horizontalInput || isOpen) {
      setState({
        open: isOpen,
        vertical: verticalInput,
        horizontal: horizontalInput,
      });
    }
    console.log({ isOpen });
  }, [isOpen]);

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        // message="I love snacks"
        key={vertical + horizontal}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity ? severity : "success"}>
          {msg ? msg : "This is a success message!"}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert> */}
      {/* <Alert severity="warning">This is a warning message!</Alert> */}
      {/* <Alert severity="info">This is an information message!</Alert> */}
      {/* <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}
