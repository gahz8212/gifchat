require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const nunjucks = require("nunjucks");
const path = require("path");
const WebSocket = require("./socket");
const passport = require("passport");
const passportConfig = require("./passport");
const { sequelize } = require("./models");
const initRouter = require("./routes");
const app = express();
passportConfig();
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db 연결됨");
  })
  .catch((e) => {
    console.error(e);
  });
app.set("port", process.env.PORT || 3008);
app.set("view engine", "html");
nunjucks.configure("views", { express: app, watch: true });
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: { httpOnly: true, secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", initRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method}${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  return res.render("error");
});
const server = app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 서버 대기 중`);
});
WebSocket(server, app);
