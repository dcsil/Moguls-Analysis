import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { uploadVideo } from "../utils/fetch";
import Context from "../utils/context";

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
  const context = useContext(Context);

  // State to store uploaded file
  const [file, setFile] = useState(null);
  const [videoPath, setVideoPath] = useState(null);
  const [imageResult, setImageResult] = useState(false);

  // State for Dropzpne
  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setVideoPath(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  // Handles file upload event and updates state
  function handleUpload() {
    const uploadVideoAndGetResult = async () => {
      context.handleLoading();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);
      console.log(formData.get("file"));
      console.log(formData.get("filename"));
      console.log("current token: " + context.tokenState);
      const resultBack = await uploadVideo(formData, context.tokenState);
      context.handleClearLoading();
      if (resultBack.status === 200) {
        context.handleSuccess("Metrics are successfully extracted.");
        props.onClick({ ...resultBack.data, videoName: file.name });
        setImageResult(true);
      } else {
        // console.log(resultBack.data);
        context.handleFailure(resultBack.data);
      }
    };
    uploadVideoAndGetResult();
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} {...getRootProps()}>
        <input {...getInputProps()} name="file" type="file" />
        {file ? (
          imageResult ? (
            <img
              src="/static/result.png"
              alt="Pose estimation with annotation"
            />
          ) : (
            <ReactPlayer
              url={videoPath}
              width="100%"
              height="100%"
              controls={true}
            />
          )
        ) : (
          <div>
            <CloudUploadIcon fontSize="large" />
            <h2 style={{ margin: "20px" }}>
              Drag and drop a video file here, or click to select a video
            </h2>
            <h3>(Supported video extensions: mp4)</h3>
          </div>
        )}
      </Paper>
      {imageResult ? (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth={true}
          style={{ marginTop: "20px" }}
          onClick={() => {
            setImageResult(false);
            setFile(null);
            setVideoPath(null);
          }}
        >
          Clear Uploaded File
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth={true}
          style={{ marginTop: "20px" }}
          disabled={!file}
          onClick={() => {
            handleUpload();
          }}
        >
          Start Analyze
        </Button>
      )}
    </div>
  );
}

export default FileUpload;
