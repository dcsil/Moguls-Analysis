import axios from "axios";

/** Call this function to send video file to server
 *
 * @param {*} video the video file that is needed to be upload
 */

export const uploadVideo = (data) => {
  return axios
    .post("/videoUpload", data, {
      headers: {
        Accept: "application/json, video/*, */*",
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((error) => {
      return error.response;
    });
};

/** get all saved data from database */
export const getAllData = () => {
  return axios("/getAllData", {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
};

/** Save a new data record in the database
 *
 * @param {*} data the data file that is needed to be saved
 */

export const saveData = (data) => {
  axios
    .post("/addData", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
};
