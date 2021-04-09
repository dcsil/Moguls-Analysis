import axios from "axios";

/** Call this function to send video file to server
 *
 * @param {*} video the video file that is needed to be upload
 */

export const uploadVideo = (data, token) => {
  return axios
    .post("/videoUpload", data, {
      headers: {
        Accept: "application/json, video/*, */*",
        "Content-Type": "multipart/form-data",
      },
      params: {
        token: token,
      },
    })
    .catch((error) => {
      return error.response;
    });
};

/** get all saved data from database */
export const getAllData = (token) => {
  return axios
    .get("/getAllData", {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      params: {
        token: token,
      },
    })
    .catch((error) => {
      return error.response;
    });
};

/** Save a new data record in the database
 *
 * @param {*} data the data file that is needed to be saved
 */

export const saveData = (data, token) => {
  return axios
    .post("/addData", data, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        token: token,
      },
    })
    .catch((error) => {
      return error.response;
    });
};

/** Delete a data record in the database given the record id
 *
 * @param {*} data the data file that is needed to be saved
 */

export const deleteData = (_id, token) => {
  return axios
    .delete("/deleteData/" + _id, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        token: token,
      },
    })
    .catch((error) => {
      return error.response;
    });
};

/** Send request to login a user
 */
export const userLogin = (data) => {
  return axios
    .post("/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      return error.response;
    });
};

/** Send request to register a new user
 */
export const userRegister = (data) => {
  return axios
    .post("/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      return error.response;
    });
};

/** Send request to register a new user
 */
export const userLogout = () => {
  return axios.get("/logout").catch((error) => {
    return error.response;
  });
};
