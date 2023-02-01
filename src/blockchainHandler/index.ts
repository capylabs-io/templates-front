import { FixedNumber } from "@ethersproject/bignumber";
import { isNumber, last } from "lodash-es";
import Web3 from "web3";

const getChainConfig = (chainId: any) => {
  chainId = isNumber(chainId) ? +chainId : chainId;
  let rpc = "";
  let name = "";
  let explorer = "";
  switch (chainId) {
    case 1:
    case "eth":
      name = "Ethereum Mainnet";
      rpc = "https://speedy-nodes-nyc.moralis.io/d2e931da4619b9acf870755d/eth/mainnet";
      explorer = "https://etherscan.io/";
      // rpc = 'https://cloudflare-eth.com'
      break;
    case 3:
      name = "Ropsten Test Network";
      rpc = "https://eth-ropsten.alchemyapi.io/v2/4szhG-FVK337Gq63VnnPoB3VH2BLYIQE";
      explorer = "https://ropsten.etherscan.io/";
      break;
    case 56:
    case "bsc":
      name = "BSC MainNET";
      rpc = "https://bsc-dataseed.binance.org";
      explorer = "https://bscscan.com/";
      break;
    case 97:
      name = "BSC TestNET";
      rpc = "https://data-seed-prebsc-1-s1.binance.org:8545/";
      explorer = "https://testnet.bscscan.com/";
      break;
  }
  return { rpc, name, explorer };
};

const getWeb3 = (chainId: any) => {
  chainId = isNumber(chainId) ? +chainId : chainId;
  const { rpc } = getChainConfig(chainId);
  if (rpc) {
    const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
    (web3 as any).chainId = chainId;
    return web3;
  } else return null;
};

// const cachedContracts: { [id: string]: IIdoContract } = {};

// function getMarketNftContract(chainId: any) {
//   chainId = +chainId;
//   switch (chainId) {
//     case 56:
//     case "56":
//       return MarketNftContract.getInstance(
//         "0xD27393209C42bdd446F867265ea327e45Ca4FCf6",
//         getWeb3(+chainId) as any
//       );
//     case 97:
//     case "97":
//       return MarketNftContract.getInstance(
//         "0x4fc207eaD09d7ABE1fa97D21D3e9A127003603aA",
//         getWeb3(+chainId) as any
//       );
//   }
//   return null;
// }
// function getMarketplaceContract(chainId: any) {
//   chainId = +chainId;
//   switch (chainId) {
//     case 101:
//     case 103:
//       return SolanaMarketplaceContract.getInstance(chainId);
//     case 56:
//     case "56":
//       return MarketplaceContract.getInstance(
//         "0x70eC8Cf0F4CFE68024CB59bEBe2f7Ada402B1fF0",
//         getWeb3(+chainId) as any
//       );
//     case 97:
//     case "97":
//       return MarketplaceContract.getInstance(
//         "0xac02EB9a591A942B0e6cfF7e7a2a126B4A287c0c",
//         getWeb3(+chainId) as any
//       );
//   }
//   return null;
// }

function etherBatchRequest(web3: Web3, methods: any[]) {
  if (!methods.length) return [];
  const batch = new web3.BatchRequest();
  const tasks = Promise.all(
    methods.map(
      (method) =>
        new Promise((resolve, reject) => {
          batch.add(
            method.call.request({}, function (error, result) {
              if (error) {
                console.error("Errror=", method, error);
                reject(error);
              } else {
                resolve(result);
              }
            })
          );
        })
    )
  );
  batch.execute();
  return tasks;
}

export const blockchainHandler = {
  getChainConfig,
  getWeb3,
  ETHER_ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
  etherBatchRequest,
  // getMarketNftContract,
  // getMarketplaceContract,
};
export type ChainType = "eth" | "bsc";
