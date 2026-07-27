const express = require("express");
const { createFarm, getProfile, listFarms, upsertProfile } = require("./profile.service");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getProfile());
});

router.post("/", (req, res, next) => {
  try {
    const profile = upsertProfile(req.body);
    res.status(201).json({ profile });
  } catch (error) {
    next(error);
  }
});

router.get("/farms", (_req, res) => {
  res.json({ farms: listFarms() });
});

router.post("/farms", (req, res, next) => {
  try {
    const farm = createFarm(req.body);
    res.status(201).json({ farm });
  } catch (error) {
    next(error);
  }
});

module.exports = { profileRouter: router };
