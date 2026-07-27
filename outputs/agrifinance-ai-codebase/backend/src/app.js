const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const { errorHandler } = require("./shared/error-handler");
const { healthRouter } = require("./modules/health/health.routes");
const { recordsRouter } = require("./modules/records/records.routes");
const { farmersRouter } = require("./modules/farmers/farmers.routes");
const { farmsRouter } = require("./modules/farms/farms.routes");
const { profileRouter } = require("./modules/profile/profile.routes");

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use("/api/health", healthRouter);
  app.use("/api/records", recordsRouter);
  app.use("/api/profile", profileRouter);
  app.use("/api/farmers", farmersRouter);
  app.use("/api/farms", farmsRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "Route not found" });
  });

  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
