const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./database");

// define main app
const app = express();

// config middleware
app.use(express.json());
app.use(cors({ exposedHeaders: ["UID", "Auth-Token", "Authorization"] }));
app.use(bearerToken());

// define main route
app.get("/", (req, res) => {
  res.setHeader("X-Foo", "bar");
  res.status(200).send("<h1>Wellcome to My RESTAPIs</h1>");
});

// setup routes
const routers = require("./routers");
app.use("/users", routers.user_router);
app.use("/album", routers.uploadRouter);

// binding to local port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`API is running at port : ${PORT}.`));
