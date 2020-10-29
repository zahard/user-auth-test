export enum UserSignInType {
  Google = 'google',
  Email = 'email'
}

export interface User {
  profile: UserProfile;
  isSignedIn: boolean;
  signInType: UserSignInType;
}

export interface UserProfile {
  image: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
}
