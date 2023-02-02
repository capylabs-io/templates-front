import moment from "moment";
import web3 from "web3";

class LocalData {
  getAccountToken(account: string, tokenAddress: string): { amount: string; time: string } {
    return JSON.parse(localStorage.getItem(`${account}_${tokenAddress}`)!);
  }
  setAccountToken(account: string, tokenAddress: string, amount: string) {
    localStorage.setItem(
      `${account}_${tokenAddress}`,
      JSON.stringify({
        amount,
        time: moment().toISOString(),
      })
    );
  }
}

export const localdata = new LocalData();
