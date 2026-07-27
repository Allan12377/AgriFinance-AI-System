const express = require("express");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "agrifinance-api",
    timestamp: new Date().toISOString(),
  });
});

module.exports = { healthRouter: router };
