import React, { useState, useContext } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Context from "../utils/context";
import { userLogin } from "../utils/fetch";
import { useCookies } from "react-cookie";

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
  signup: {
    textAlign: "right",
    marginTop: theme.spacing(2),
  },
  signupButton: {
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
  loginLabel: {
    marginTop: theme.spacing(5),
  },
  textField: {
    marginTop: theme.spacing(1),
  },
  loginButton: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const context = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["loginInfo"]);

  const handleChange = (e) => {
    let changeName = e.target.name;
    let currValue = e.target.value;
    if (changeName === "username") {
      setUsername(currValue);
    } else {
      setPassword(currValue);
    }
  };

  function handleLogin(event) {
    event.preventDefault();
    const sendLoginRequest = async () => {
      context.handleLoading();
      const resultBack = await userLogin({
        username: username,
        password: password,
      });
      context.handleClearLoading();
      if (resultBack.status === 200) {
        context.handleSuccess("You have successfully signed in.");
        let loginData = { username: username, token: resultBack.token };
        context.handleUserLogin(loginData);
        setCookie("loginInfo", loginData, { path: "/" });
      } else {
        context.handleFailure(resultBack.data);
      }
    };
    sendLoginRequest();
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.outerContainer}>
        <Paper className={classes.paper}>
          <Grid container spacing={10}>
            <Grid item xs={5}>
              <img
                src="/static/login_img.svg"
                alt="Login"
                className={classes.image}
              />
            </Grid>
            <Grid item xs={7} className={classes.loginContainer}>
              <div className={classes.signup}>
                <Typography variant="h6" className={classes.h2}>
                  Don't have an account?
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    className={classes.signupButton}
                    onClick={props.switchRegister}
                  >
                    Sign up
                  </Button>
                </Typography>
              </div>

              <Typography variant="h2" className={classes.h2}>
                Welcome
              </Typography>
              <Typography variant="h4" className={classes.h4}>
                Login your account
              </Typography>
              <form autoComplete="off">
                <Typography variant="h5" className={classes.loginLabel}>
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
                  fullWidth
                  className={classes.textField}
                  onChange={handleChange}
                />
                <Typography variant="h5" className={classes.loginLabel}>
                  Password
                </Typography>
                <TextField
                  required
                  id="password"
                  type="password"
                  label="Your password"
                  name="password"
                  value={password}
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  className={classes.loginButton}
                  onClick={handleLogin}
                >
                  LOGIN
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
