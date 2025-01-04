import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from './environment';

export const authConfig: AuthConfig = {
  issuer: environment.auth.issuer,
  redirectUri: window.location.origin,
  clientId: environment.auth.clientId,
  dummyClientSecret: environment.auth.clientSecret,
  responseType: 'password',
  scope: 'user-sinple-web-roles',
  showDebugInformation: true,
  tokenEndpoint: `${environment.auth.issuer}/protocol/openid-connect/token`,
};
