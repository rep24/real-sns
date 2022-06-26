const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//データベース接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DBと接続中");
  })
  .catch((err) => {
    console.log(err);
  });

//ミドルウェア
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


//第一引数はエンドポイント
//第二引数のコールバック関数はリクエストとレスポンス時の処理を書く
app.get("/", (req, res) => {
  res.send("hello express");
});

// app.get("/users", (req, res) => {
//     res.send("hello users");
// })

app.listen(PORT, () => console.log("サーバー起動"));
