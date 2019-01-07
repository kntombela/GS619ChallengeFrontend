import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { AUTH_CONFIG } from './auth.config';
import { ENV } from '../core/env.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: AUTH_CONFIG.RESPONSE_TYPE,
    redirectUri: AUTH_CONFIG.REDIRECT,
    scope: AUTH_CONFIG.SCOPE
  });

  constructor(public router: Router) {
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/login']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
    // Get user's profile
    this._getProfile(authResult);
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Logout from Auth0
    this.auth0.logout({
      clientId: AUTH_CONFIG.CLIENT_ID,
      returnTo: ENV.BASE_URI
    });
    // Go back to the home route
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`);
      }
    });
  }

  // public getProfile(cb): void {
  //   if (!this._accessToken) {
  //     throw new Error('Access Token must exist to fetch profile');
  //   }
  
  //   const self = this;
  //   this.auth0.client.userInfo(this._accessToken, (err, profile) => {
  //     if (profile) {
  //       self.userProfile = profile;
  //     }
  //     cb(err, profile);
  //   });
  // }
}
