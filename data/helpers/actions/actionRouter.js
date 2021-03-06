const express = require("express");
const router = express.Router();
const actionModel = require("./actionModel.js");
const projectModel = require("../projects/projectModel.js");
const projectRouter = require("../projects/projectRouter.js");

//router.use("/:id/projects", projectRouter);
// router.use("/:id/actions", actionRouter);

router.post("/", validateActionPost, (req, res) => {
  const body = req.body;
  actionModel
    .insert(body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({ error: "internal server error" });
    });
});

router.get("/", validateActionPost, (req, res) => {
  actionModel
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ error: "internal server error" });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  const id = req.params.id;
  actionModel
    .get(id)
    .then(action => {
      res.json(action);
    })
    .catch(err => {
      res.status(500).json({ error: "internal server error" });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  const id = req.params.id;
  actionModel
    .remove(id)
    .then(action => {
      res.send("deleted");
    })
    .catch(err => {
      res.status(500).json({ error: "internal server error" });
    });
});

router.put("/:id", validateActionId, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  actionModel
    .update(id, body)
    .then(action => {
      res.status(200).json(body);
    })
    .catch(err => {
      res.status(500).json({ error: "internal server error" });
    });
});

function validateActionId(req, res, next) {
  const actionId = req.params.id;
  actionModel.get(actionId).then(action => {
    if (!action) {
      res.status(400).json({ message: "action id not found" });
    } else {
      next();
    }
  });
}

function validateActionPost(req, res, next) {
  const body = req.body;
  if (!body.project_id || !body.description || !body.notes) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    body.project_id
      ? projectModel
          .get(body.project_id)
          .then(project => {
            res.json(project);
          })

          // .catch(err => {
          //   res.status(404).json({ err: "project id not found" });
          .catch(err)
      : res.status(500).json({ message: "internal server error", error: err });
    next();
  }
}

module.exports = router;
