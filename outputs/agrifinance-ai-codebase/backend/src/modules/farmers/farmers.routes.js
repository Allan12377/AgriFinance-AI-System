const express = require("express");
const { getProfile, upsertProfile } = require("../profile/profile.service");

const router = express.Router();

router.get("/me", (_req, res) => {
  res.json(getProfile());
});

router.post("/me", (req, res, next) => {
  try {
    const profile = upsertProfile(req.body);
    res.status(201).json({ profile });
  } catch (error) {
    next(error);
  }
});

module.exports = { farmersRouter: router };
