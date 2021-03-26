import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    marginTop: theme.spacing(12),
  },
  paper: {
    padding: theme.spacing(3),
  },
  loginContainer: {
    paddingRight: theme.spacing(20),
  },
  image: {
    marginTop: theme.spacing(8),
  },
  h2: {
    marginTop: theme.spacing(10),
  },
  h4: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  loginLabel: {
    marginTop: theme.spacing(5),
  },
  textField: {
    marginTop: theme.spacing(1),
  },
  loginButton: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(20),
  },
}));

export default function Auth() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
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
              <Typography variant="h2" className={classes.h2}>
                Welcome
              </Typography>
              <Typography variant="h4" className={classes.h4}>
                Login your account
              </Typography>
              <form noValidate autoComplete="off">
                <Typography variant="h5" className={classes.loginLabel}>
                  Username
                </Typography>
                <TextField
                  required
                  id="username"
                  label="Your email"
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                />
                <Typography variant="h5" className={classes.loginLabel}>
                  Password
                </Typography>
                <TextField
                  required
                  id="username"
                  label="Your password"
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  className={classes.loginButton}
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
