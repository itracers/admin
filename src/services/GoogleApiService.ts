import { dataProvider } from "../dataProvider";

export interface OAuthParams {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
}

export interface GetTokenResponse {
  token: string;
}

export class GoogleApiService {
  private static _instance: GoogleApiService;
  static getInstance() {
    if (!GoogleApiService._instance) {
      GoogleApiService._instance = new GoogleApiService();
    }
    return GoogleApiService._instance;
  }

  async getAuthDetails(): Promise<OAuthParams> {
    return dataProvider.get("/google-oauth");
  }

  async getToken(code: string): Promise<GetTokenResponse> {
    return dataProvider.get("/google-oauth/callback", { code });
  }

  redirectToOAuth(data: OAuthParams) {
    const { client_id, redirect_uri, response_type, scope } = data;
    const url = new URL(
      import.meta.env.VITE_GOOGLE_OAUTH_URL,
      import.meta.env.VITE_GOOGLE_AUTH_BASE_URL
    );
    url.searchParams.append("scope", scope);
    url.searchParams.append("client_id", client_id);
    url.searchParams.append("redirect_uri", redirect_uri);
    url.searchParams.append("response_type", response_type);
    url.searchParams.append("access_type", "offline");
    window.location.replace(url);
  }

  isGoogleCallbackPage() {
    return window.location.href.includes("/google/oauth/callback");
  }

  getCode() {
    const currentUrl = new URL(window.location.href);
    return currentUrl.searchParams.get("code");
  }
}
