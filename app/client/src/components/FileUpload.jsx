import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

// reference code:
// https://www.educative.io/edpresso/file-upload-in-react
// https://github.com/NikValdez/react-dropzone-tut/blob/master/src/App.js

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: theme.palette.text.secondary,
    minHeight: "400px",
    marginTop: "20px",
  },
  button: {
    marginTop: "20px",
  },
}));

function FileUpload(props) {
  const classes = useStyles();

  // State to store uploaded file
  const [file, setFile] = useState(null);
  const [videoPath, setVideoPath] = useState(null);

  // State for Dropzpne
  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setVideoPath(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);
    // TODO: Add code here to upload file to server
    // ...
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} {...getRootProps()}>
        <input {...getInputProps()} />
        {file ? (
          <ReactPlayer
            url={videoPath}
            width="100%"
            height="100%"
            controls={true}
          />
        ) : (
          <div>
            <CloudUploadIcon fontSize="large" />
            <h2 style={{ margin: "20px" }}>
              Drag and drop a video file here, or click to select a video
            </h2>
            <h3>(Supported video extensions: mp4, mkv)</h3>
          </div>
        )}
      </Paper>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth={true}
        style={{ marginTop: "20px" }}
        disabled={!file}
        onClick={() => {
          props.onClick({
            // Some hardcode data for UI tests
            videoName: file.name,
            kneeHipAngle: 5.2,
            hipChestAngle: -3,
            chestArmAngle: 6.1,
            armsAngleDiff: 9.2,
            kneesAngleDiff: 8,
          });
        }}
      >
        Start Analyze
      </Button>
    </div>
  );
}

export default FileUpload;
