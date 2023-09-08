const WebSocket = require("ws");
const FeeEstimate = require("./utils/fee-estimator");
const http = require("http");
const server = http.createServer();

const wss = new WebSocket.Server({ server });
let latestAverageFee = null;

wss.on("connection", (ws) => {
  console.log("WebSocket connection established.");

  ws.on("message", async (message) => {
    if (message === "get_fee_estimate") {
      const averageFeeInfo = await FeeEstimate.getFeeEstimate();
      latestAverageFee = averageFeeInfo;
      ws.send(JSON.stringify(averageFeeInfo));
    }
  });
});

module.exports = { latestAverageFee };
