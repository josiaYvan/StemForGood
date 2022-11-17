const multer = require("multer");
const upload = multer();
const app = require("express")();
const { join } = require("path");
const { writeFile } = require("fs/promises");
const cors = require("cors");

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["sessionId", "content-type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,PUT,POST,PATCH,DELETE,HEAD",
  prefLightContinue: false,
};

app.use(cors(corsOption));

const uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalide file"))
    errors.format = "format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "La taille depass de 500ko";

  return errors;
};

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }
  const fileName = req.body.name + ".jpg";
  try {
    await writeFile(
      join(__dirname, "../../public/images", fileName),
      req.file.buffer
    );
    res.status(200).json({ message: "Image enregistré ☺" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "failed", err });
  }
});

app.listen(5000, console.log("Listening on -> http://localhost:5000"));
