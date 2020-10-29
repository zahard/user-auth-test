import { User } from 'src/app/models/user.model';

export interface AppState {
  user: User;
  loader: boolean;
}
