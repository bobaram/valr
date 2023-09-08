const express = require("express");
const error = require("../middleware/error");
const feeEstimate = require("../routes/fee-estimator");
module.exports = function (app) {
  app.use(express.json());
  app.use(error);
  app.use("/getfee", feeEstimate);
};
