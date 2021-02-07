const express = require("express");
const { MongooseDocument } = require("mongoose");

// require the Drone model here
const DroneModel = require("../models/Drone.model.js");

const router = express.Router();

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  DroneModel.find()
    .then((drones) => {
      res.render("drones/list.hbs", { drones });
    })
    .catch(() => {
      console.log("Cannot show Drones");
    });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const { droneName, dronePropellers, droneSpeed } = req.body;
  // console.log(req.body)
  let myNewDrone = {
    name: droneName,
    propellers: dronePropellers,
    maxSpeed: droneSpeed,
  };

  DroneModel.create(myNewDrone)
    .then(() => {
      res.redirect("/drones");
    })
    .catch(() => {
      console.log("error creating");
    });
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  let id = req.params.id;

  // const { droneName, dronePropellers, droneSpeed } = req.body;
  DroneModel.findById(id)
    .then((drone) => {
      res.render("drones/update-form.hbs", { drone });
    })
    .catch(() => {
      console.log("error");
    });
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  let id = req.params.id;
  const { droneName, dronePropellers, droneSpeed } = req.body;

  let editedDrone = {
    name: droneName,
    propellers: dronePropellers,
    maxSpeed: droneSpeed,
  };

  DroneModel.findByIdAndUpdate(id, editedDrone)
    .then(() => {
      res.redirect('/drones');
    })
    .catch(() => {
      console.log("error updating");
    });
});

router.get("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone

  let id = req.params.id;
  DroneModel.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/drones');
    })
    .catch(() => {
      console.log("Error deleting");
    });
});

module.exports = router;
