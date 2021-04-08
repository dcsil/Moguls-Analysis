import React, { useState, useContext } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Context from "../utils/context";
import { userRegister } from "../utils/fetch";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    marginTop: theme.spacing(12),
  },
  paper: {
    padding: theme.spacing(3),
  },
  image: {
    marginTop: theme.spacing(8),
  },
  login: {
    textAlign: "right",
    marginTop: theme.spacing(2),
  },
  loginButton: {
    marginLeft: theme.spacing(1),
  },
  h2: {
    marginTop: theme.spacing(5),
  },
  h4: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
    color: "grey",
  },
  signupLabel: {
    marginTop: theme.spacing(5),
  },
  textField: {
    marginTop: theme.spacing(1),
  },
  signupButton: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
  },
}));

export default function Signup(props) {
  const classes = useStyles();
  const context = useContext(Context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleChange = (e) => {
    let changeName = e.target.name;
    let currValue = e.target.value;
    if (changeName === "username") {
      setUsername(currValue);
    } else if (changeName === "password") {
      setPassword(currValue);
    } else {
      setConfirmedPassword(currValue);
    }
  };

  function handleRegister(event) {
    event.preventDefault();
    if (password !== confirmedPassword) {
      context.handleFailure("Please make sure your passwords match.");
      return;
    }

    const sendRegisterRequest = async () => {
      context.handleLoading();
      const resultBack = await userRegister({
        username: username,
        password: password,
      });
      context.handleClearLoading();
      if (resultBack.status === 200) {
        context.handleSuccess("Your account is successfully registered.");
        props.switchLogin();
      } else {
        context.handleFailure(resultBack.data);
      }
    };

    sendRegisterRequest();
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.outerContainer}>
        <Paper className={classes.paper}>
          <Grid container spacing={10}>
            <Grid item xs={5}>
              <img
                src="/static/signup_img.svg"
                alt="Login"
                className={classes.image}
              />
            </Grid>
            <Grid item xs={7} className={classes.loginContainer}>
              <div className={classes.login}>
                <Typography variant="h6" className={classes.h2}>
                  Already have an account?
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    className={classes.loginButton}
                    onClick={props.switchLogin}
                    title="loginButton"
                  >
                    Login
                  </Button>
                </Typography>
              </div>

              <Typography variant="h2" className={classes.h2}>
                Welcome
              </Typography>
              <Typography variant="h4" className={classes.h4}>
                Register your account
              </Typography>
              <form autoComplete="off">
                <Typography variant="h5" className={classes.signupLabel}>
                  Username
                </Typography>
                <TextField
                  required
                  id="username"
                  type="email"
                  label="Your email"
                  variant="outlined"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  fullWidth
                  className={classes.textField}
                  inputProps={{ "data-testid": "usernameTextField" }}
                />
                <Typography variant="h5" className={classes.signupLabel}>
                  Password
                </Typography>
                <TextField
                  required
                  id="password"
                  type="password"
                  label="Your password"
                  variant="outlined"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  fullWidth
                  className={classes.textField}
                  inputProps={{ "data-testid": "passwordTextField" }}
                />
                <Typography variant="h5" className={classes.signupLabel}>
                  Confirm Password
                </Typography>
                <TextField
                  required
                  id="passwordConfirmed"
                  label="Confirm your password"
                  type="password"
                  variant="outlined"
                  name="confirmedPassword"
                  value={confirmedPassword}
                  onChange={handleChange}
                  fullWidth
                  className={classes.textField}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  className={classes.signupButton}
                  onClick={handleRegister}
                  title="signupButton"
                >
                  SIGN UP
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
