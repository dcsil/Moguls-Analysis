import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

export default function Signup() {
  const classes = useStyles();

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
                  fullWidth
                  className={classes.textField}
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
                  fullWidth
                  className={classes.textField}
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
                  fullWidth
                  className={classes.textField}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  className={classes.signupButton}
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
