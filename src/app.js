const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./router/autorisation.js");
const sequelizeConfig = require("./config/config.js");
const fs = require("fs");
const path = require("path");
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

const app = express();

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "public", "index.html");
  fs.readFile(indexPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading index.html:", err);
      return res.status(500).send("Internal Server Error");
    }

    const modifiedHtml = data.replace(
      '<div id="root"></div>',
      `<div id="root">``<App />``</div>`
    );

    res.send(modifiedHtml);
  });
});

const startServer = async () => {
  try {
    await sequelizeConfig.authenticate();
    console.log("Connection has been established successfully.");

    await sequelizeConfig.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    app.listen(process.env.APP_PORT, () => {
      console.log(`App running on port ${process.env.APP_PORT}.`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
