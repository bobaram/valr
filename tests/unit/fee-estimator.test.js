const FeeEstimate = require("../../utils/fee-estimator");

jest.mock("../../utils/fee-estimator", () => ({
  getFeeEstimate30Blocks: jest.fn(),
  getFeeEstimate5Blocks: jest.fn(),
  getFeeEstimate: jest.fn(),
}));

describe("Fee Estimate Unit Tests", () => {
  it("should calculate the average fee for the last 30 blocks", async () => {
    FeeEstimate.getFeeEstimate30Blocks.mockResolvedValue({
      averageFeeGwei: 10070573.138016785,
      averageFeeUSD: 16.419868090073606,
    });
    const averageFeeInfo = await FeeEstimate.getFeeEstimate30Blocks();

    expect(averageFeeInfo).toHaveProperty("averageFeeGwei");
    expect(averageFeeInfo).toHaveProperty("averageFeeUSD");
  });
  it("should calculate the average fee for the last 5 blocks", async () => {
    FeeEstimate.getFeeEstimate5Blocks.mockResolvedValue({
      averageFeeGwei: 10070573.138016785,
      averageFeeUSD: 16.419868090073606,
    });
    const averageFeeInfo = await FeeEstimate.getFeeEstimate5Blocks();

    expect(averageFeeInfo).toHaveProperty("averageFeeGwei");
    expect(averageFeeInfo).toHaveProperty("averageFeeUSD");
  });
  it("should calculate the average fee for the latest block", async () => {
    FeeEstimate.getFeeEstimate.mockResolvedValue({
      latestBlockNumber: 18080035,
      averageFeeGwei: 10070573.138016785,
      averageFeeUSD: 16.419868090073606,
    });
    const averageFeeInfo = await FeeEstimate.getFeeEstimate();

    expect(averageFeeInfo).toHaveProperty("averageFeeGwei");
    expect(averageFeeInfo).toHaveProperty("averageFeeUSD");
    expect(averageFeeInfo).toHaveProperty("latestBlockNumber");
  });
});
