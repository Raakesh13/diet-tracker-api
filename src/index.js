const express = require("express");
const userRouter = require("./routers/user");
const mealRouter = require("./routers/meal");
require("../src/db/mongoose");
const app = express();

const port = process.env.PORT;

const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)/)) {
      return cb(new Error("Please upload a Word document"));
    }

    cb(undefined, true);

    // cb(new Error("File must be a PDF"));
    // cb(undefined, true);
    // cb(undefined, false);
  },
});
app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.use(express.json());
app.use(userRouter);
app.use(mealRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
