import config from "@/config";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives";

export interface HttpOptions {
  method: string | 'GET' | 'POST';
  headers: Record<string, string>;
  data: string | FormData | Record<string, any>;
}
export class Http {
  // async get(uri: string, options: HttpOptions) {
  //   return this.request(uri, {...options, method: 'GET'})
  // }
  // async post(uri: string, data: RequestInit['body'], options: HttpOptions) {
  //   return this.request(uri, {...options, method: 'POST', data})
  // }

  // async request(uri: string, options: HttpOptions) {
  //   const url = `${config.base_api}${uri}`;
  //   const init = {
  //     method: options.method || 'GET',
  //     cache: 'no-store',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       ...options
  //     },
  //     body: options.data,
  //   }
  //   return new Promise(async (resolve, reject) => {
  //     const response = await fetch(url, init)
  //     if (response.ok) {
  //       return resolve(await response.json())
  //     }
  //     return reject(response.statusText)
  //   });
  // }
}