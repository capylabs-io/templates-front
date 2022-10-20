import Web3 from "web3";
import { isNumber } from "lodash-es";

const getChainConfig = (chainId: any) => {
  chainId = isNumber(+chainId) ? +chainId : chainId;
  let rpc = "";
  let name = "";
  // let explorer = "";
  switch (chainId) {
    case 43114:
      name = "Avalance MainNET";
      rpc = "https://api.avax.network/ext/bc/C/rpc";
      break;
    case 43113:
      name = "Avalance TestNET";
      rpc = "https://api.avax-test.network/ext/bc/C/rpc";
      break;
  }
  return { rpc, name };
};

const getWeb3 = (chainId: any) => {
  chainId = isNumber(+chainId) ? +chainId : chainId;
  const { rpc, name } = getChainConfig(chainId);
  if (rpc) return new Web3(new Web3.providers.HttpProvider(rpc));
  else return null;
};

export const blockchainHandler = {
  getChainConfig,
  getWeb3,
};
