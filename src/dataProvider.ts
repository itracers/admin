import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";

const fetchJson = (url: string, options: fetchUtils.Options = {}) => {
    console.log({url},localStorage.getItem("token"))
  options.user = {
    authenticated: true,
    token: localStorage.getItem("token") as string,
  };
  return fetchUtils.fetchJson(url, options);
};

const baseDataProvider = simpleRestProvider(
  import.meta.env.VITE_BASE_URL,
  fetchJson
);

export const dataProvider = {
  ...baseDataProvider,
  get: async (url: string, query?: Record<string, string>) => {
    const target = new URL(url, import.meta.env.VITE_BASE_URL);
    if (query) {
      target.search = new URLSearchParams(query).toString();
    }
    return fetch(target, { method: "get" }).then((response) => response.json());
  },
};
