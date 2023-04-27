const SocketIO = require("socket.io");
module.exports = (server) => {
  const io = SocketIO(server, { path: "/socket.io" });
  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwared-for"] || req.socket.remoteAddress;
    socket.on("reply", (data) => {
      console.log(data, ip, socket.id, req.id);
    });
    socket.on("error", (e) => {
      console.error(e);
    });
    socket.on("disconnect", () => {
      console.log(`${ip}가 연결을 해제 했습니다.`);
      clearInterval(socket.interval);
    });
    socket.interval = setInterval(() => {
      socket.emit("news", "hello socket");
    }, 3000);
  });
};
