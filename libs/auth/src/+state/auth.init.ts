import {Auth} from './auth.interfaces';

export const authInitialState: Auth = {
  loggedIn: false,
  loading: false,
  accessToken: null
};
