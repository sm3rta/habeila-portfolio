import cors from "cors";
import express from "express";
import createError from "http-errors";
import coverRouter from "./routes/cover";
import resumeRouter from "./routes/resume";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", resumeRouter);
app.use("/", coverRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
};
app.use(errorHandler);

app.listen(3001, () => {
  console.log(`Example app listening on port ${3001}`);
});

export default app;
