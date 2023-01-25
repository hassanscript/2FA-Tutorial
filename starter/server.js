const express = require("express");
const cookieParser = require("cookie-parser");
const { JsonDB, Config } = require("node-json-db");

const userDb = new JsonDB(new Config("users", true, true, "/"));

const app = express();
app.use(cookieParser());

app.use(express.static("public"));

// login user
app.get("/login", async (req, res) => {
  try {
    const { id, password } = req.query;
    const user = await userDb.getData("/" + id);
    if (user && user.password === password) {
      return res.cookie("id", id).send({
        success: true,
      });
    }
    throw false;
  } catch (err) {
    res.status(500).send({
      error: "Invalid credentials",
    });
  }
});

// check current session
app.get("/check", (req, res) => {
  const { id } = req.cookies;
  if (id)
    return res.send({
      success: true,
      id,
    });
  return res.status(500).send({
    success: false,
  });
});

// logout user
app.get("/logout", async (req, res) => {
  res.clearCookie("id");
  res.send({
    success: true,
  });
});

app.listen(3000, () => {
  console.log("App is listening on port: 3000");
});
