import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";

// reference code:
// https://www.educative.io/edpresso/file-upload-in-react
// https://github.com/NikValdez/react-dropzone-tut/blob/master/src/App.js

function FileUpload() {
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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {file ? (
        <ReactPlayer url={videoPath} width="20%" height="20%" controls={true} />
      ) : (
        <p>Drag and drop a video file here, or click to select a video</p>
      )}
    </div>
  );
}

// return (
//   <div id="upload-box">
//     <input type="file" onChange={handleUpload} />
//     <p>Filename: {file.name}</p>
//     <p>File type: {file.type}</p>
//     <p>File size: {file.size} bytes</p>
//     {file && <ImageThumb image={file} />}
//   </div>
// );
// }

export default FileUpload;
