const axios = require("axios");

const projectId = "Your_Infaura_Api_Key";

const getAverageFeeEstimate = async (blockCount) => {
  try {
    const latestBlockResponse = await axios.post(
      `https://mainnet.infura.io/v3/${projectId}`,
      {
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const latestBlockHex = latestBlockResponse.data.result;
    const latestBlockNumber = parseInt(latestBlockHex, 16);

    const averageFeePromises = [];

    for (let i = latestBlockNumber; i > latestBlockNumber - blockCount; i--) {
      const blockResponse = await axios.post(
        `https://mainnet.infura.io/v3/${projectId}`,
        {
          jsonrpc: "2.0",
          method: "eth_getBlockByNumber",
          params: [`0x${i.toString(16)}`, true],
          id: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const block = blockResponse.data.result;

      if (block && block.transactions) {
        const totalFees = block.transactions.reduce((sum, tx) => {
          return sum + parseInt(tx.gasPrice, 16) * parseInt(tx.gas, 16);
        }, 0);

        const averageFeeGwei = totalFees / block.transactions.length / 1e9;

        averageFeePromises.push(averageFeeGwei);
      }
    }

    const averageFeeGwei =
      averageFeePromises.reduce((sum, fee) => sum + fee, 0) /
      averageFeePromises.length;

    const exchangeRateResponse = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const gweiToUsdRate = exchangeRateResponse.data.ethereum.usd;

    const averageFeeUSD = (averageFeeGwei / 1e9) * gweiToUsdRate;

    return {
      averageFeeGwei,
      averageFeeUSD,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAverageFeeEstimate,
};
