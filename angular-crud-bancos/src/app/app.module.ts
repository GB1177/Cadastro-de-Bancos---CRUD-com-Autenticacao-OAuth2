import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './modules/core/interceptors/auth.interceptor';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SharedModule } from './modules/shared/shared.module';
import { LoginModule } from './modules/login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    LoginModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [
          'https://auth-dev.princeton-lemitar.com.br/realms/princeton-lemitar/protocol/openid-connect/token',
        ],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent], 
})
export class AppModule {}
