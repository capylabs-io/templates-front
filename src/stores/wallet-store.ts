import { applicationStore } from "./application-store";
import { action, computed, observable, flow } from "mobx";
// import { actionAsync, asyncAction } from "mobx-utils";
import Application from "@/libs/models";
import Web3 from "web3";
import { Subscription, timer } from "rxjs";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { Zero } from "@/constants";
import { FixedNumber } from "@ethersproject/bignumber";
import { snackController } from "@/components/snack-bar/snack-bar-controller";
import { apiService } from "@/services/api-service";
import { UserModel } from "@/models/user-model";
import { ThemeModel } from "@/models/theme-model";
import { localdata } from "@/helpers/local-data";
import { waitUntil } from "async-wait-until";

export class WalletStore {
  ethereum: any = (window as any).ethereum;

  app = new Application({ mainnet: false });

  @observable web3: Web3 | null = null;
  @observable account = "";
  @observable chainId = "5";
  @observable loaded = false;

  @observable navigationDrawer = false;
  @observable isMetamask = false;
  @observable mobileDialog = false;

  @observable jwt = "";
  @observable userId = "";
  @observable userInfo?: UserModel | null;
  @observable userThemes?: ThemeModel[] | null;

  @observable accountBalance = Zero;

  LPTokenContract?: any;

  @action.bound setAuth(jwt: string, user: UserModel) {
    this.jwt = jwt;
    this.userId = user.id;
    this.userInfo = user;
    this.userThemes = user.themes;
  }
  @action.bound resetAuth() {
    this.jwt = "";
    this.userId = "";
    this.userInfo = null;
    this.userThemes = [];
  }
  //TODO: Remove this
  @action.bound minusUserBalance(amount: string) {
    if (!this.connected || !applicationStore.daoToken) return;
    this.accountBalance = this.accountBalance.subUnsafe(FixedNumber.from(amount));
    localdata.setAccountToken(
      this.account,
      applicationStore.daoToken.address,
      this.accountBalance.toString()
    );
  }
  @action.bound addUserBalance(amount: string) {
    if (!this.connected || !applicationStore.daoToken) return;
    this.accountBalance = this.accountBalance.addUnsafe(FixedNumber.from(amount));
    localdata.setAccountToken(
      this.account,
      applicationStore.daoToken.address,
      this.accountBalance.toString()
    );
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

  start = flow(function* (this) {
    try {
      this.app.start();
      this.isMetamask = this.app.isMetamask;
      // this.web3 = this.app.web3
      if (yield this.app.getAddress()) {
        yield this.connect();
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loaded = true;
    }
  });

  connect = flow(function* (this) {
    loadingController.increaseRequest();
    try {
      const ok = yield this.app.login();
      // this.web3 = this.app.web3;
      if (ok) {
        this.web3 = this.app.web3;
        this.chainId = yield this.web3!.eth.getChainId();
        this.account = yield this.app.getAddress();
        const response = yield apiService.getOneTimeNonce(this.account);
        if (!response || !response.nonce) {
          snackController.error("Invalid wallet address!");
          return;
        }
        const oneTimeNonce = response.nonce;
        const signature = yield this.signMessage(this.account, oneTimeNonce);
        if (!signature) return;
        const res = yield apiService.signIn({
          walletAddress: this.account,
          signature,
        });
        if (!res) return;
        this.setAuth(res.jwt, res.user);
      }
      return ok;
    } catch (error) {
      error.message && snackController.error(error.message);
      return false;
    } finally {
      loadingController.decreaseRequest();
    }
  });

  async signMessage(account, nonce) {
    if (!account) return "";
    const message = `Sign message with accont: ${account} and one time nonce: ${nonce}`;
    if (typeof window === "undefined") {
      return "";
    }
    if (this.ethereum) {
      const request = { method: "personal_sign", params: [message, account] };
      return await this.ethereum.request(request);
    } else {
      throw new Error("Plugin Metamask is not installed!");
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

  // ethereumConfigChanged = () => {
  //   window.location.reload();
  // };

  async switchNetwork(chainId: number) {
    if (this.connected) {
      try {
        await this.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
      } catch (error) {
        if (error.message.includes("wallet_addEthereumChain")) {
          if (chainId === Number(process.env.VUE_APP_CHAIN_ID)) {
            this.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: Web3.utils.toHex(chainId),
                  chainName: "Goerli Testnet",
                  nativeCurrency: {
                    name: "eth",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
                  blockExplorerUrls: ["https://goerli.etherscan.io/"],
                },
              ],
            });
          }
          // else if (Number(process.env.VUE_APP_CHAIN_ID)) {
          //   this.ethereum.request({
          //     method: "wallet_addEthereumChain",
          //     params: [
          //       {
          //         chainId: Web3.utils.toHex(chainId),
          //         chainName: "Avalanche Testnet",
          //         nativeCurrency: {
          //           name: "Avax",
          //           symbol: "AVAX",
          //           decimals: 18,
          //         },
          //         rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
          //         blockExplorerUrls: ["https://testnet.snowtrace.io/"],
          //       },
          //     ],
          //   });
          // }
        }
      }
    }
  }

  //#region computed
  @computed get connected() {
    return !!this.account && !!this.jwt;
  }

  @computed get userPaidThemes() {
    if (!this.connected || !this.userThemes) return [];
    return this.userThemes;
  }

  //TODO: update this load from token contract
  @action loadUserBalance() {
    if (!localdata.getAccountToken(this.account, applicationStore.daoToken?.address))
      localdata.setAccountToken(this.account, applicationStore.daoToken?.address, "100000");
    const balance = localdata.getAccountToken(this.account, applicationStore.daoToken?.address);
    this.accountBalance = FixedNumber.from(balance.amount);
  }

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
