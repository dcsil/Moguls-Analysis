import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { uploadVideo, uploadImage } from "../utils/fetch";
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
  const [filePath, setFilePath] = useState(null);
  const [uploadResult, setUploadResult] = useState(false);

  // State for Dropzpne
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setFilePath(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  // Handles file upload event and updates state
  function handleUpload() {
    const uploadImageAndGetResult = async () => {
      context.handleLoading();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);
      console.log(formData.get("file"));
      console.log(formData.get("filename"));
      // const resultBack = await uploadVideo(formData);
      const resultBack = await uploadImage(formData);
      context.handleClearLoading();
      if (resultBack.status === 200) {
        context.handleSuccess("Metrics are successfully extracted.");
        props.onClick({ ...resultBack.data, videoName: file.name });
        setUploadResult(true);
      } else {
        // console.log(resultBack.data);
        context.handleFailure(resultBack.data);
      }
    };
    uploadImageAndGetResult();
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} {...getRootProps()}>
        <input {...getInputProps()} name="file" type="file" />
        {file ? (
          <img src={filePath} alt="uploaded file" />
        ) : (
          <div>
            <CloudUploadIcon fontSize="large" />
            <h2 style={{ margin: "20px" }}>
              Drag and drop an image file here, or click to select an image
            </h2>
            <h3>(Supported image extensions: png, jpg, jpeg)</h3>
          </div>
        )}
      </Paper>
      {uploadResult ? (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth={true}
          style={{ marginTop: "20px" }}
          onClick={() => {
            setUploadResult(false);
            setFile(null);
            setFilePath(null);
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
