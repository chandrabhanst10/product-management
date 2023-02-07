const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", require("./Router/UserRoutes"));
app.use("/api/product", require("./Router/ProductRoutes"));

app.listen(process.env.PORT, () => {
  require("./Db/Connection");
  console.log(`Server is running on ${process.env.PORT}`);
});
