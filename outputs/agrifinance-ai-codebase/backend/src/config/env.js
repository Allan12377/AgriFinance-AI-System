require("dotenv").config();

const env = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL || "",
  aiServiceUrl: process.env.AI_SERVICE_URL || "http://localhost:8000",
  jwtSecret: process.env.JWT_SECRET || "agrifinance-dev-secret-change-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

module.exports = { env };
