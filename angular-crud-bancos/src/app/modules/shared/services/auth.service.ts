import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/environments/auth.config';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
  }

  /**
   * Realiza o login utilizando fluxo de senha.
   * @param username Nome de usuário
   * @param password Senha do usuário
   * @returns Observable<void>
   */
  public login(username: string, password: string): Observable<void> {
    return from(
      this.oauthService.fetchTokenUsingPasswordFlow(username, password)
    ).pipe(
      map(() => {
        const token = this.oauthService.getAccessToken();
        if (token) {
          localStorage.setItem('access_token', token);
        }
      }),
      catchError((error) => {
        console.error('Falha no login:', error);
        return throwError(() => new Error('Falha no login'));
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.oauthService.logOut();
  }

  /**
   * Obtém o token de acesso armazenado no localStorage.
   * @returns O token de acesso, ou null caso não esteja presente
   */
  public getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Armazena o nome de usuário após o login.
   * @param username Nome do usuário
   */
  public setUserName(username: string): void {
    localStorage.setItem('username', username);
  }

  /**
   * Recupera o nome de usuário armazenado.
   * @returns Nome do usuário ou null se não estiver definido
   */
  public getUserName(): string | null {
    return localStorage.getItem('username');
  }
}
