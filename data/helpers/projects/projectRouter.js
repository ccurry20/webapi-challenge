const express = require("express");
const router = express.Router();
const projectModel = require("../projects/projectModel.js");
const actionModel = require("./actionModel.js");
const projectRouter = require("../projects/projectRouter.js");
router.use("/:id/projects", projectRouter);
router.use("/:id/actions", actionRouter);

router.post("/", (req, res) => {
  const body = req.body;
  projectModel.insert(body).then(project => {
    res.status(201).json(project);
  });
});

router.get("/", (req, res) => {
  projectModel.get().then(projects => {
    res.status(200).json(projects);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  projectModel.getById(id).then(project => {
    res.json(project);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  projectModel.getProjectActions(id).then(project => {
    res.json(project);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  projectModel.remove(id).then(project => {
    res.send("deleted");
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  projectModel.update(id, body).then(project => {
    res.status(200).json(body);
  });
});

module.exports = router;
