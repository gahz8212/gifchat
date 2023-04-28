const express = require("express");
const router = express.Router();
const rooms = [
  { id: 0, title: "test1", password: "123", max: 3, owner: "kim" },
  { id: 1, title: "test2", password: "234", max: 3, owner: "choi" },
];
router.get("/", async (req, res) => {
  try {
    // ㅁㅇㄴㄹ;
    return res.render("main", { title: "대기실", rooms });
  } catch (e) {
    const error = new Error(e);
    return res.render("main", { title: "대기실", error });
  }
});
router.post("/room", async (req, res) => {
  const title = req.body.title;
  const max = req.body.max;
  const password = req.body.password;
  console.log(title, max, password);
  return res.redirect("/");
});
router.get("/room", async (req, res) => {
  return res.render("room", { title: "방 생성" });
});
module.exports = router;
