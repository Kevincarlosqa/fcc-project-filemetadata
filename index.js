var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
var app = express();
// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Define la carpeta de destino donde se almacenarán los archivos subidos.
    callback(null, "public/");
  },
  filename: (req, file, callback) => {
    // Obtiene la extensión del archivo original
    const ext = file.originalname.split(".").pop();

    // Define el nombre del archivo en función de la fecha actual, el nombre original del archivo y su extensión
    const filename = Date.now() + "-" + file.originalname;

    // Agrega el campo "type" al objeto file
    file.type = `image/${ext}`;

    callback(null, filename);
  },
});

const upload = multer({ storage: storage });
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  res.json({
    name: req.file.filename,
    type: req.file.type,
    size: req.file.size,
  });
});
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
