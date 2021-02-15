const fs = require("fs");
const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");

const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const shopRoutes = require("./routes/shop");
const cardRoutes = require("./routes/card");

const app = express();

const hbs = handlebars.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/shop", shopRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
