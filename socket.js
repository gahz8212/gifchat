const SocketIO = require("socket.io");
module.exports = (server, app) => {
  const io = SocketIO(server, { path: "/socket.io" });
  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");
  room.on("connection", (socket) => {
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
      socket.emit("news", "hello room");
    }, 3000);
  });
  chat.on("connection", (socket) => {
    socket.on("reply", (data) => {
      console.log(data);
    });
    socket.on("error", (e) => {
      console.error(e);
    });
    socket.on("disconnect", () => {
      console.log(`${ip}가 연결을 해제 했습니다.`);
      clearInterval(socket.interval);
    });
    socket.interval = setInterval(() => {
      socket.emit("");
    }, 3000);
  });
};
