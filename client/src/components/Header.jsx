import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Context from "../utils/context";
// import { userLogout } from "../utils/fetch";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import Logo from "./Logo";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
  button: {
    textTransform: "none",
  },
}));

export default function Header() {
  const classes = useStyles();
  const context = useContext(Context);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [cookies, setCookie] = useCookies(["loginInfo"]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function handleLogout(event) {
    event.preventDefault();
    context.handleSuccess("You have successfully logged out.");
    context.handleUserLogout();
    setCookie("loginInfo", {});
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        {context.loadingState && <LinearProgress color="secondary" />}
        <Toolbar>
          <Logo size="50" />
          <Typography variant="h3" className={classes.title}>
            Moguls Analysis
          </Typography>

          {context.authState && (
            <div>
              <Button
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
                className={classes.button}
              >
                <AccountCircle />{" "}
                <Typography variant="h5" className={classes.title}>
                  {context.usernameState}
                </Typography>
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
