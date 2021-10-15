import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 10000,
});

// Axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (!error.response) {
//       console.log("Please check your internet connection.");
//       return Promise.reject(error);
//     }
//   }
// );
