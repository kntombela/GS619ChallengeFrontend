import { ENV } from "../core/env.config";

interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    RESPONSE_TYPE: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
    PROFILE_NAMESPACE: string;
  };
  
  export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'phiqjrgk34HsRIigxTUtyXk4SbsF2987',
    CLIENT_DOMAIN: 'digispect.auth0.com',
    RESPONSE_TYPE: 'token id_token',
    AUDIENCE: 'https://yolesa/api',
    REDIRECT: `${ENV.BASE_URI}/callback`,
    SCOPE: 'openid profile',
    PROFILE_NAMESPACE: 'http://myapp.com/profile'
  };