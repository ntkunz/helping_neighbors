import { io } from "socket.io-client";

const URL = process.env.REACT_APP_API_URL;

export const socket = io(URL, {
   headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
   autoConnect: false,
   withCredentials: true,
});