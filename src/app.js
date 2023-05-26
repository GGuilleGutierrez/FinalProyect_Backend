const express = require('express');
const app = express();
const PORT = 3001;
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.listen(PORT, () => console.log('escuchando en el puerto 3001'));
app.use(require("./routes/routes"))

