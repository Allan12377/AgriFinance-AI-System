const express = require("express");
const { createFarm, listFarms } = require("../profile/profile.service");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({ farms: listFarms() });
});

router.post("/", (req, res, next) => {
  try {
    const farm = createFarm(req.body);
    res.status(201).json({ farm });
  } catch (error) {
    next(error);
  }
});

module.exports = { farmsRouter: router };
