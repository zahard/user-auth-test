import { Injectable, NgZone } from '@angular/core';
import { ScriptLoaderService } from './script-loader.service';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../models/user.model';

declare const gapi: any;

@Injectable()
export class GoogleAuthService {

  googleAuth: any;

  constructor(
    private loader: ScriptLoaderService,
    private ngZone: NgZone
  ) {
    this.loader.loadScript('https://apis.google.com/js/platform.js')
      .then(() => this.onGapiLoad())
      .catch(() => this.loadingFailed());
  }

  onGapiLoad() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: environment.googleClientKey,
        scope: 'profile email',
      })
      .then(auth => this.googleAuth = auth)
      .catch(() => this.loadingFailed());
    });
  }

  signIn(): Promise<UserProfile> {
    if (!this.googleAuth) {
      return Promise.reject(new Error('Unable to load google login api'));
    }

    // If user is already signed in with Google
    if (this.googleAuth.isSignedIn.get()) {
      return Promise.resolve(this.buildProfile(this.googleAuth.currentUser.get()));
    }

    return new Promise((resolve, reject) => {
      this.ngZone.run(() => {
        this.googleAuth.signIn()
          .then(googleUser => resolve(this.buildProfile(googleUser)))
          .catch(() => reject());
      });
    });
  }

  signOut(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.ngZone.run(() => {
        if (!this.googleAuth) {
          return resolve(true);
        }
        this.googleAuth.signOut()
          .then(() => resolve(true))
          .catch(() => reject());
      });
    });
  }

  buildProfile(googleUser): UserProfile {
    const basicProfile = googleUser.getBasicProfile();
    return {
      name: basicProfile.getName(),
      firstName: basicProfile.getGivenName(),
      lastName: basicProfile.getFamilyName(),
      image: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
    };
  }

  private loadingFailed() {
    console.error('Google login api loading is failed');
  }
}
