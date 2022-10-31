import { action, computed, observable, runInAction, flow } from "mobx";
// import { actionAsync, asyncAction } from "mobx-utils";
import Application from "@/libs/models";
import Web3 from "web3";
import { Subscription, timer } from "rxjs";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { Zero } from "@/constants";
import { FixedNumber } from "@ethersproject/bignumber";
import { snackController } from "@/components/snack-bar/snack-bar-controller";
import { apiService } from "@/services/api-service";

export class WalletStore {
  ethereum: any = (window as any).ethereum;

  app = new Application({ mainnet: false });
  @observable web3: Web3 | null = null;
  @observable account = "";
  @observable avaxBalance = Zero;
  @observable hvgBalance = Zero;
  @observable chainId = "";
  @observable loaded = false;

  @observable navigationDrawer = false;
  @observable isMetamask = false;
  @observable mobileDialog = false;

  @observable jwt = "";

  LPTokenContract?: any;
  private _balanceSubscription: Subscription | undefined;

  constructor() {
    //
  }

  @action.bound changeJwt(value: string) {
    this.jwt = value;
  }
  @action.bound resetJwt() {
    this.jwt = "";
  }

  // @action *getAvaxBalance() {
  //   const result = yield this.web3?.eth.getBalance(this.account!);
  //   this.avaxBalance = FixedNumber.from(
  //     this.web3?.utils.fromWei(result, "ether")
  //   );
  // }
  // @flow *getUserTokenBalance() {
  //   this.LPTokenContract = new (this.web3 as any).eth.Contract(
  //     require("@/helpers/erc20.abi.json"),
  //     process.env.VUE_APP_TOKEN_ADDRESS
  //   );
  //   const balance = yield this.LPTokenContract.methods
  //     .balanceOf(this.account!)
  //     .call();
  //   this.hvgBalance = FixedNumber.from(`${this.web3?.utils.fromWei(balance)}`);
  // }

  @flow *start() {
    try {
      console.log("okokok");
      this.app.start();
      this.isMetamask = this.app.isMetamask;
      // this.web3 = this.app.web3
      if (yield this.app.getAddress()) {
        yield this.connect();
      }
    } catch (error) {
      console.error(error);
    }
    this.loaded = true;
  }

  @flow *connect() {
    loadingController.increaseRequest();
    try {
      const ok = yield this.app.login();
      // this.web3 = this.app.web3;
      if (ok) {
        this.web3 = this.app.web3;
        this.chainId = yield this.web3!.eth.getChainId();
        this.account = yield this.app.getAddress();
        const oneTimeNonce = apiService.getOneTimeNonce(this.account);
        console.log(oneTimeNonce);
        
      }
      return ok;
    } catch (error) {
      error.message && snackController.error(error.message);
      return false;
    } finally {
      loadingController.decreaseRequest();
    }
  }

  // @action disconnectAccount() {
  //   try {
  //     loadingController.increaseRequest();
  //     this.account = "";
  //     this.web3 = null;
  //     this.ethereum?.removeListener(
  //       "accountsChanged",
  //       this.ethereumConfigChanged
  //     );
  //     this.ethereum?.removeListener("chainChanged", this.ethereumConfigChanged);
  //     this._balanceSubscription?.unsubscribe();
  //   } finally {
  //     loadingController.decreaseRequest();
  //   }
  // }

  // @action.bound setNavigationDrawer(val) {
  //   this.navigationDrawer = val;
  // }

  // @action.bound setMobileDialog(val) {
  //   this.mobileDialog = val;
  // }

  // ethereumConfigChanged = () => {
  //   window.location.reload();
  // };

  // async switchNetwork(chainId: number) {
  //   if (this.connected) {
  //     try {
  //       await this.ethereum.request({
  //         method: "wallet_switchEthereumChain",
  //         params: [{ chainId: Web3.utils.toHex(chainId) }],
  //       });
  //     } catch (error) {
  //       if (error.message.includes("wallet_addEthereumChain")) {
  //         if (chainId === Number(process.env.VUE_APP_CHAIN_ID)) {
  //           this.ethereum.request({
  //             method: "wallet_addEthereumChain",
  //             params: [
  //               {
  //                 chainId: Web3.utils.toHex(chainId),
  //                 chainName: "Avalanche Mainnet",
  //                 nativeCurrency: {
  //                   name: "Avax",
  //                   symbol: "AVAX",
  //                   decimals: 18,
  //                 },
  //                 rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  //                 blockExplorerUrls: ["https://snowtrace.io/"],
  //               },
  //             ],
  //           });
  //         } else if (Number(process.env.VUE_APP_CHAIN_ID)) {
  //           this.ethereum.request({
  //             method: "wallet_addEthereumChain",
  //             params: [
  //               {
  //                 chainId: Web3.utils.toHex(chainId),
  //                 chainName: "Avalanche Testnet",
  //                 nativeCurrency: {
  //                   name: "Avax",
  //                   symbol: "AVAX",
  //                   decimals: 18,
  //                 },
  //                 rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  //                 blockExplorerUrls: ["https://testnet.snowtrace.io/"],
  //               },
  //             ],
  //           });
  //         }
  //       }
  //     }
  //   }
  // }

  // //#region computed
  // @computed get connected() {
  //   return !!this.account;
  // }

  // @computed get shortAccount() {
  //   if (!this.account) return "";
  //   return (
  //     this.account.substr(0, 3) +
  //     "..." +
  //     this.account.substr(this.account.length - 3)
  //   );
  // }

  // @computed get isChainIdValid() {
  //   //TODO: change to mainnet
  //   return (
  //     this.chainId &&
  //     this.chainId + "" === Number(process.env.VUE_APP_CHAIN_ID).toString()
  //   );
  //   // return this.chainId && this.chainId + "" === Number(process.env.VUE_APP_CHAIN_ID).toString();
  // }
  //#endregion
}

export const walletStore = new WalletStore();
