const express = require("express");

const actionRouter = require("./data/helpers/actions/actionRouter");
const projectRouter = require("./data/helpers/projects/projectRouter");

const server = express();
server.use(express.json());

server.use("/actions", actionRouter);
server.use("/projects", projectRouter);

server.use("/", (req, res) => res.send("API up and running!"));

server.listen(8000, () => console.log("API running on port 8000"));

module.exports = server;
