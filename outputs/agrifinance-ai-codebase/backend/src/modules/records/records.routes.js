const express = require("express");
const {
  createRecord,
  deleteRecord,
  getSummary,
  listRecords,
} = require("./records.service");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({ records: listRecords() });
});

router.get("/summary", (_req, res) => {
  res.json(getSummary());
});

router.post("/", (req, res, next) => {
  try {
    const record = createRecord(req.body);
    res.status(201).json({ record });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const record = deleteRecord(req.params.id);
    res.json({ deleted: record });
  } catch (error) {
    next(error);
  }
});

module.exports = { recordsRouter: router };
