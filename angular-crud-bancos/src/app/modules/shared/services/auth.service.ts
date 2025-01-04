import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const authConfig: AuthConfig = {
  issuer: 'https://auth-dev.princetonlemitar.com.br/realms/princetonlemitar',
  clientId: 'sinple-web',
  responseType: 'code',
  redirectUri: window.location.origin,
  scope: 'user-sinple-web-roles',
  showDebugInformation: true,
};

interface UserClaims {
  realm_access: {
    roles: string[];
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(username: string, password: string) {
    this.oauthService
      .fetchTokenUsingPasswordFlow(username, password)
      .then(() => {
      });
  }

  logout() {
    this.oauthService.logOut();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  hasRole(role: string): boolean {
    const token = this.oauthService.getAccessToken();
    if (!token) {
      return false;
    }
    const claims = this.oauthService.getIdentityClaims() as UserClaims;
    if (!claims || !claims.realm_access || !claims.realm_access.roles) {
      return false;
    }
    const roles = claims.realm_access.roles;
    return roles.includes(role);
  }
}
