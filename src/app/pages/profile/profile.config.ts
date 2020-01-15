interface ProfileConfig {
    AUDIENCE: string;
    DOMAIN: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    GRANT_TYPE: string;
    ACCESS_POINT: string;
  };
  
  export const PROFILE_CONFIG: ProfileConfig = {
    AUDIENCE: 'https://digispect.auth0.com/api/v2/',
    DOMAIN: 'digispect.auth0.com',
    CLIENT_ID: 'pedTaBp7y5GPYD7KRPeDg8Kgv4V4FabB',
    CLIENT_SECRET: 'KVnacivmVGr8TvHHBGfmmmLTLmLk1OZc_FfefVWiTA-dK1jUnRkIj7u_B2izmnVR',
    GRANT_TYPE: 'client_credentials',
    ACCESS_POINT: 'https://digispect.auth0.com/oauth/token'
  };