import express from "express";
import dbConnect from "./utils/dbConnection.js";
import cors from "cors";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import indexRouter from "./routers/index.js";
import { appConfig } from "./config/appConfig.js";

const app = express();
dbConnect();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "*",
  })
);
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.use("/api/v1", indexRouter);

app.use(notFound);
app.use(errorHandler);

const port = appConfig.port || 5000;

app.listen(port, () => {
  console.log("Server Running on " + `${port}`);
  return true;
});
