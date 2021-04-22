import { dispatch } from 'resources/store';
import { apiClient } from 'helpers/api';
import * as actions from './user.actions';

apiClient.on('error', (error) => {
  if (error.status === 401) {
    dispatch(actions.logOut());
  }
});
