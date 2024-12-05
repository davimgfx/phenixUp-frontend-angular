import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  clientId:'256885758630-8rghu2toni4srrk4spg7lr2gj1e2vi4e.apps.googleusercontent.com',
  redirectUri: 'http://localhost:4200/login/',
  scope: 'openid profile email',
};
