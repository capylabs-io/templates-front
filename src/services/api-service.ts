import { VueResponsiveComponents } from "vue-responsive-components";
import { TransactionModel } from "./../models/transaction-model";
import { ThemeModel } from "./../models/theme-model";
import { walletStore } from "@/stores/wallet-store";
import Axios from "axios";
import moment from "moment";
import { ApplicationModel } from "@/models/application-model";
export type ApiRouteType =
  | "applications"
  | "themes"
  | "transactions"
  | "proposals"
  | "users"
  | "votes"
  | "comments"
  | "dao-settings";

const axios = Axios.create({ baseURL: process.env.VUE_APP_API_ENDPOINT });

export class ApiHandler<T> {
  constructor(private axios, private route: ApiRouteType) {}

  async count(params?: any): Promise<number> {
    const res = await this.axios.get(`${this.route}/count`, { params });
    return res.data;
  }

  async create(model: T): Promise<T> {
    const res = await this.axios.post(this.route, model);
    return res.data;
  }

  async delete(id: any): Promise<T> {
    const res = await this.axios.delete(`${this.route}/${id}`);
    return res.data;
  }

  async find<T>(
    params?: any,
    settings: { _sort?: string; _limit?: number; _start?: number } = {}
  ): Promise<T[]> {
    const settingDefault = { _sort: "createdAt:DESC", _limit: -1, _start: 0 };
    params = { ...settingDefault, ...settings, ...(params ?? {}) };

    const res = await this.axios.get(this.route, { params });
    const lst = res.data;
    return lst;
  }

  async findOne<T>(id: any): Promise<T> {
    let res: any;
    if (id) {
      res = await this.axios.get(`${this.route}/${id}`);
    } else {
      res = await this.axios.get(`${this.route}`);
    }
    const result = res.data;
    return result;
  }

  async update(id: any, model: T): Promise<T> {
    let res: any;
    if (id) {
      res = await this.axios.put(`${this.route}/${id}`, model);
    } else {
      res = await this.axios.put(`${this.route}`, model);
    }
    return res.data;
  }
}

export class ApiHandlerJWT<T> {
  constructor(private axios, private route: ApiRouteType) {}
  async count(params?: any): Promise<number> {
    const res = await this.axios.get(`${this.route}/count`, {
      params,
      headers: {
        ...axios.defaults.headers,
        // Authorization: `Bearer ${walletStore.jwt}`,
      },
    });
    return res.data;
  }

  async create(model: T): Promise<T> {
    const res = await this.axios.post(this.route, model, {
      headers: {
        ...axios.defaults.headers,
        Authorization: `Bearer ${walletStore.jwt}`,
      },
    });
    return res.data;
  }

  async delete(id: any): Promise<T> {
    const res = await this.axios.delete(`${this.route}/${id}`, {
      headers: { Authorization: `Bearer ${walletStore.jwt}` },
    });
    return res.data;
  }

  async find<T>(
    params?: any,
    settings: { _sort?: string; _limit?: number; _start?: number } = {}
  ): Promise<T[]> {
    const settingDefault = { _sort: "createdAt:DESC", _limit: 25, _start: 0 };
    params = { ...settingDefault, ...settings, ...(params ?? {}) };
    const res = await this.axios.get(this.route, {
      params,
      headers: {
        ...axios.defaults.headers,
        // Authorization: `Bearer ${walletStore.jwt}`,
      },
    });
    const lst = res.data;
    return lst;
  }

  async findOne<T>(id: any): Promise<T> {
    let res: any;
    if (id) {
      res = await this.axios.get(`${this.route}/${id}`, {
        // headers: { Authorization: `Bearer ${walletStore.jwt}` },
      });
    } else {
      res = await this.axios.get(`${this.route}`, {
        // headers: { Authorization: `Bearer ${walletStore.jwt}` },
      });
    }
    const result = res.data;
    return result;
  }

  async update(id: any, model?: any): Promise<T> {
    let res: any;
    if (id) {
      res = await this.axios.put(`${this.route}/${id}`, model, {
        headers: { Authorization: `Bearer ${walletStore.jwt}` },
      });
    } else {
      res = await this.axios.put(`${this.route}`, model, {
        headers: { Authorization: `Bearer ${walletStore.jwt}` },
      });
    }
    return res.data;
  }
}

export class ApiService {
  applications = new ApiHandlerJWT<any>(axios, "applications");
  proposals = new ApiHandlerJWT<any>(axios, "proposals");
  themes = new ApiHandlerJWT<any>(axios, "themes");
  transactions = new ApiHandlerJWT<any>(axios, "transactions");
  votes = new ApiHandlerJWT<any>(axios, "votes");
  comments = new ApiHandlerJWT<any>(axios, "comments");
  daoSettings = new ApiHandlerJWT<any>(axios, "dao-settings");
  users = new ApiHandlerJWT<any>(axios, "users");

  async signUp(publicAddress: string) {
    const res = await axios.post(`auth/local/register`, { publicAddress });
    return res.data;
  }

  async signIn(model) {
    const { walletAddress, signature } = model;
    const res = await axios.post(`login/metamask`, { walletAddress, signature });
    return res.data;
  }

  async getOneTimeNonce(walletAddress: string) {
    const res = await axios.get("user-nonces/get-nonce?address=" + walletAddress);
    return res.data;
  }

  async getFile(id: any) {
    const res = await axios.get(`upload/files/${id}`);
    return res.data;
  }

  async fetchMyInfo() {
    const res = await axios.get(`/users/me`, {
      headers: { Authorization: `Bearer ${walletStore.jwt}` },
    });
    return res.data;
  }

  async deleteApplication(appId: string) {
    const res = await axios.delete(`applications/delete/${appId}`);
    return res.data;
  }

  async restoreApplication(appId: string) {
    const res = await axios.post(`applications/restore`, {
      appId,
    });
    return res.data;
  }

  async updateAppMetadata(model) {
    const { appId, ...metadata } = model;
    const res = await axios.post(`applications/customize`, {
      appId,
      metadata,
    });
    return res.data;
  }

  async purchaseTheme(params) {
    const { userId, themeId } = params;
    const res = await axios.post(`themes/purchase`, {
      userId,
      themeId,
    });
    return res.data;
  }

  async uploadApplicationFile(formData: any) {
    const res = await axios.post(`applications/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }

  async getDefaultProposal() {
    const res = await axios.get(`proposals/default`);
    return res.data;
  }
  async getDefaultApplication() {
    const res = await axios.get(`/applications/default`);
    return res.data;
  }
}

export const apiService = new ApiService();
