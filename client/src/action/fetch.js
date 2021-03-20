/** Call this function to send video file to server
 *
 * @param {*} video the video file that is needed to be upload
 */

import axios from "axios";

export const uploadVideo = (data) => {
  return axios("/addData", {
    method: "POST",
    headers: {
      Accept: "application/json, video/*, */*",
      "Content-Type": "video/*",
    },
    body: data,
  });
};

/** Call this function to get all saved data from database */
export const getAllData = () => {
  return axios("/getAllData", {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
};

/** Call this function to send the data to database and save it in database
 *
 * @param {*} data the data file that is needed to be saved
 */

export const saveData = (data) => {
  return axios("/addData", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
    },
  });
};

// export const uploadVideo = async (video) => {
//   const request = new Request("/videoUpload", {
//     method: "POST",
//     headers: {
//       Accept: "application/json, video/*, */*",
//       "Content-Type": "video/*",
//     },
//     body: video,
//   });

//   // Send the request with fetch()
//   fetch(request)
//     .then((res) => {
//       if (res.status === 200) {
//         console.log(res.json()); // for dev and debug
//         return res.json();
//       } else {
//         console.log("status code: " + res.status);
//         console.log(res.json());
//         return res.json();
//         // alert("Sorry, fail to upload video, please try again");
//       }
//     })
//     .catch((error) => {
//       console.log("ERROR: " + error);
//     });
// };

// export const saveData = (data) => {
//   const request = new Request("/addData", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       Accept: "text/plain",
//       "Content-Type": "application/json",
//     },
//   });

//   // Send the request with fetch()
//   fetch(request)
//     .then((res) => {
//       if (res.status === 200) {
//         console.log(res.text()); // for dev and debug
//         return res.text();
//       } else {
//         console.log("status code: " + res.status);
//         console.log(res.json());
//         return res.json();
//         // alert("Sorry, save failed, please try again");
//       }
//     })
//     .catch((error) => {
//       console.log("ERROR: " + error);
//     });
// };
