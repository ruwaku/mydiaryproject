import "./loadEnv";
import express from "express";
import ApiController from "controllers/ApiController";
import ErrorController from "controllers/ErrorController";
import path from "path";

const app = express();

const config = {
  port: process.env.PORT,
};

console.log(
  `[READY] NODE_ENV: ${process.env.NODE_ENV} | cwd: ${process.cwd()} | PORT: ${process.env.PORT}`
);

app.use("/api", ApiController);
app.use("/static", express.static(path.join(__dirname, "../dist/static")));
app.get("*", (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", process.env.BACKEND_HOST!);
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.use(ErrorController);

app.listen(config.port, () => {
  console.log("백엔드 포트:", config.port);
});
