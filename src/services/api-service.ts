import { walletStore } from "@/stores/wallet-store";
import Axios from "axios";
import moment from "moment";
export type ApiRouteType = "applications";

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
    const settingDefault = { _sort: "createdAt:DESC", _limit: 10, _start: 0 };
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
        Authorization: `Bearer ${walletStore.jwt}`,
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
        headers: { Authorization: `Bearer ${walletStore.jwt}` },
      });
    } else {
      res = await this.axios.get(`${this.route}`, {
        headers: { Authorization: `Bearer ${walletStore.jwt}` },
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
  applications = new ApiHandler<any>(axios, "applications");

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
}

export const apiService = new ApiService();
