const express = require("express");
const router = express.Router({ mergeParams: true });
const projectModel = require("../projects/projectModel.js");
const actionModel = require("../actions/actionModel.js");
const actionRouter = require("../actions/actionRouter.js");
const projectRouter = require("../projects/projectRouter.js");
// //router.use("/projects/:id", projectRouter);
// router.use("/actions/id", actionRouter);

router.post("/", validateProjectId, validatePost, (req, res) => {
  const body = req.body;
  projectModel
    .insert(body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "internal server error" });
    });
});

router.get("/", validateProjectId, validatePost, (req, res) => {
  actionModel
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ error: "internal server error" });
    });
});

router.get("/:id", validateProjectId, validatePost, (req, res) => {
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

router.get("/:id/actions", validateProjectId, validatePost, (req, res) => {
  const id = req.params.id;
  projectModel
    .getProjectActions(id)
    .then(project => {
      res.json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "internal server error" });
    });
});

router.delete("/:id", validateProjectId, validatePost, (req, res) => {
  const id = req.params.id;
  projectModel
    .remove(id)
    .then(project => {
      res.send("deleted");
    })
    .catch(err => {
      res.status(500).json({ error: "internal server error" });
    });
});

router.put("/:id", validateProjectId, validatePost, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  projectModel
    .update(id, body)
    .then(project => {
      res.status(200).json(body);
    })
    .catch(err => {
      res.status(500).json({ error: "internal server error" });
    });
});

function validateProjectId(req, res, next) {
  const id = req.params.id;
  projectModel.get(id).then(project => {
    if (!project) {
      res.status(400).json({ message: "project id not found" });
    } else {
      next();
    }
  });
}

function validatePost(req, res, next) {
  const body = req.body;
  if (!body.description || !body.name) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
