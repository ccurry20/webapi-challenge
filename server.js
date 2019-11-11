const express = require("express");
const server = express();
server.use(express.json());

const actionRouter = require("./data/helpers/actions/actionRouter");
const projectRouter = require("./data/helpers/projects/projectRouter");

const actionModel = require("./data/helpers/actions/actionModel");
const projectModel = require("./data/helpers/projects/projectModel");

server.use("/actions", actionRouter);
server.use("/projects", projectRouter);

// server.use("/actions", actionModel);
// server.use("/projects", projectModel);

server.use("/", (req, res) => res.send("API up and running!"));

server.listen(8000, () => console.log("API running on port 8000"));

module.exports = server;
