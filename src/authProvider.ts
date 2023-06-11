import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AuthActionType,
} from "react-admin";
import { GoogleApiService } from "./services/GoogleApiService";

export default async (type: AuthActionType, params: Record<string, string>) => {
  if (type === AUTH_LOGIN) {
    const googleApiService = GoogleApiService.getInstance();
    if (params.code) {
      const tokenResponse = await googleApiService.getToken(params.code);
      localStorage.setItem("token", tokenResponse.token);
      window.location.replace("/");
      return;
    } else if (params.codeRequest) {
      const authParams = await googleApiService.getAuthDetails();
      googleApiService.redirectToOAuth(authParams);
    }
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("token");
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  }
  return Promise.resolve();
};
