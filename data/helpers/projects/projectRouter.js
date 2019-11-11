const express = require("express");
const router = express.Router({ mergeParams: true });
const projectModel = require("../projects/projectModel.js");
const actionModel = require("../actions/actionModel.js");
const actionRouter = require("../actions/actionRouter.js");
const projectRouter = require("../projects/projectRouter.js");
// //router.use("/projects/:id", projectRouter);
// router.use("/actions/id", actionRouter);

router.post("/", (req, res) => {
  const body = req.body;
  projectModel.insert(body).then(project => {
    res.status(201).json(project);
  });
});

router.get("/", (req, res) => {
  actionModel.get().then(projects => {
    res.status(200).json(projects);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  projectModel
    .get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "internal server error" });
    });
});

// router.get("/:id", (req, res) => {
//   const id = req.params.id;
//   actionModel.getById(id).then(project => {
//     res.json(project);
//   });
// });

router.get("/:id/actions", (req, res) => {
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
