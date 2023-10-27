const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require("./config/config");
require("./routes/pizza.routes")(app);


app.listen(port, () => console.log(`Listening on port: ${port}`));
