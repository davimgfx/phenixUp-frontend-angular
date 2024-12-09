import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private oAuthService: OAuthService,
    private http: HttpClient
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initConfiguration();
    }
  }

  private initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidIdToken()) {
        console.log('User authenticated');
      }
    });
  }

  login() {
    if (isPlatformBrowser(this.platformId)) {
      this.oAuthService.initImplicitFlow();
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.oAuthService.revokeTokenAndLogout();
      this.oAuthService.logOut();
    }
  }

  get identityClaims() {
    return this.oAuthService.getIdentityClaims();
  }

  get accessToken() {
    return this.oAuthService.getAccessToken();
  }

  get userProfile() {
    const url = 'https://www.googleapis.com/oauth2/v2/userinfo';

    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  saveToLocalStorage(profile: any) {
    const tokenValidate = new Date();
    tokenValidate.setDate(tokenValidate.getDate() + 1); // Data de expiração: dia seguinte
    const dataToSave = {
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
      token_validate: tokenValidate.toISOString(),
    };
    localStorage.setItem('userProfile', JSON.stringify(dataToSave));
  }
}
