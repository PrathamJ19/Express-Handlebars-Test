const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const customHelpers = require("./views/helpers/customHelpers");

// Sample data
const sampleData = {
    user: { name: "John Doe", email: "john@example.com" },
    users: [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
    ],
    condition: false,
  };
  

// app.engine(file_extension, engine_use(directory))
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    helpers: customHelpers
  })
);

app.set("view engine", ".hbs");

// if
app.get("/If", (req, res) => {
  res.render("If", { user: sampleData.user });
});

// unless
app.get("/unless", (req, res) => {
  res.render("unless", { condition: sampleData.condition });
});

// each
app.get("/each", (req, res) => {
  res.render("each", { users: sampleData.users });
});


// replaced information
app.get("/", (req, res) => {
    // find the home.hbs file, and fill in the information
    res.render("home", {
      title: "Home Page",
      message: "Welcome to Handlebars with Express!",
    });
  });
  

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});