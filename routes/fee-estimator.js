const express = require("express");
const router = express.Router();
const FeeEstimate = require("../utils/fee-estimator");

router.get("/", async (req, res) => {
  const averageFeeInfo = await FeeEstimate.getAverageFeeEstimate(1);
  res.send(averageFeeInfo);
});

router.get("/5-blocks", async (req, res) => {
  const averageFeeInfo = await FeeEstimate.getAverageFeeEstimate(5);
  res.send(averageFeeInfo);
});

router.get("/30-blocks", async (req, res) => {
  const averageFeeInfo = await FeeEstimate.getAverageFeeEstimate(30);
  res.send(averageFeeInfo);
});

module.exports = router;
