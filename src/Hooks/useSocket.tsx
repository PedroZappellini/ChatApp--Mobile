import { io } from "socket.io-client";

const socket = io("http://172.16.229.60:3000", {
  autoConnect: false,
});

export default socket;
