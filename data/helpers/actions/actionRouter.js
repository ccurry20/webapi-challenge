const express = require("express");
const router = express.Router();
const actionModel = require("./actionModel.js");
const projectModel = require("../projects/projectModel.js");
const projectRouter = require("../projects/projectRouter.js");

//router.use("/:id/projects", projectRouter);
// router.use("/:id/actions", actionRouter);

router.post("/", (req, res) => {
  const body = req.body;
  actionModel.insert(body).then(action => {
    res.status(201).json(action);
  });
});

router.get("/", (req, res) => {
  actionModel.get().then(actions => {
    res.status(200).json(actions);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  actionModel.get(id).then(action => {
    res.json(action);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  actionModel.remove(id).then(action => {
    res.send("deleted");
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  actionModel.update(id, body).then(action => {
    res.status(200).json(body);
  });
});

module.exports = router;
