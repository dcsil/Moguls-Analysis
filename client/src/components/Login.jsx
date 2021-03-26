import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(3),
  },
  h4: {},
}));

export default function Auth() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.outerContainer}>
        <Paper className={classes.paper}>
          <Grid container spacing={10}>
            <Grid item xs={5}>
              <img src="/static/login_img.svg" alt="Login" />
            </Grid>
            <Grid item xs={7}>
              <Typography variant="h2">Welcome</Typography>
              <Typography variant="h4" className={classes.h4}>
                Login your account
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
