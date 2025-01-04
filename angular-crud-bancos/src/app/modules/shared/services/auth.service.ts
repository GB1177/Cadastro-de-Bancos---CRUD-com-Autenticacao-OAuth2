import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {authConfig} from 'src/environments/auth.config';


interface UserClaims {
  realm_access: {
    roles: string[];
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
  }

 public  login(username: string, password: string) {
    this.oauthService
      .fetchTokenUsingPasswordFlow(username, password)
      .then(() => {
        console.log('Login successful');
      })
      .catch(err => {
        console.error('Login failed',);
      });
  }

  public logout() {
    this.oauthService.logOut();
  }

  public getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }
}
