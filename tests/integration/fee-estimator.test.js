const axios = require("axios");
const server = require("../../server");

jest.mock("axios");

describe("API Integration Tests", () => {
  beforeAll(() => {
    // Mock the Axios post request for Infura
    axios.post.mockResolvedValue({
      data: { result: "0x100" },
      status: 200,
    });

    // Mock the Axios get request for CoinGecko
    axios.get.mockResolvedValue({
      data: { ethereum: { usd: 1000 } },
      status: 200,
    });
  });

  afterAll(() => {
    // Restore the original Axios behavior after all tests are done
    jest.restoreAllMocks();
  });

  describe("GET /getfee/30-blocks", () => {
    it("should return the average fee for the last 30 blocks", async () => {
      // Simulate a successful HTTP GET request to your server
      const expectedResponse = {
        averageFeeGwei: 10070573.138016785,
        averageFeeUSD: 16.419868090073606,
      };

      axios.get.mockResolvedValue({
        data: expectedResponse,
        status: 200,
      });

      const response = await axios.get(`${server}/getfee/30-blocks`);
      expect(response.status).toBe(200);

      const data = response.data;

      expect(data).toHaveProperty("averageFeeGwei");
      expect(data).toHaveProperty("averageFeeUSD");
      // Add assertions to compare with the expectedResponse values
    });
  });
  describe("GET /getfee/5-blocks", () => {
    it("should return the average fee for the last 5 blocks", async () => {
      const expectedResponse = {
        averageFeeGwei: 10070573.138016785,
        averageFeeUSD: 16.419868090073606,
      };

      axios.get.mockResolvedValue({
        data: expectedResponse,
        status: 200,
      });

      const response = await axios.get(`${server}/getfee/30-blocks`);
      expect(response.status).toBe(200);

      const data = response.data;

      expect(data).toHaveProperty("averageFeeGwei");
      expect(data).toHaveProperty("averageFeeUSD");
    });
  });

  describe("GET /getfee", () => {
    it("should return the average fee for the latest block", async () => {
      const expectedResponse = {
        latestBlockNumber: 18080035,
        averageFeeGwei: 10070573.138016785,
        averageFeeUSD: 16.419868090073606,
      };

      axios.get.mockResolvedValue({
        data: expectedResponse,
        status: 200,
      });

      const response = await axios.get(`${server}/getfee`);
      expect(response.status).toBe(200);

      const data = response.data;

      expect(data).toHaveProperty("averageFeeGwei");
      expect(data).toHaveProperty("averageFeeUSD");
    });
  });
});
