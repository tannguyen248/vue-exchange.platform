import { fireApp } from './firebase';
import routePaths from '../router/routePaths';

export const setLocalProfile = (profile) => {
  if (profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }
};

export const getLocalProfile = () => {
  var profile = localStorage.getItem('profile');

  if (profile) {
    return JSON.parse(localStorage.getItem('profile'));
  }

  return null;
};

export const removeLocalProfile = () => {
  localStorage.removeItem('profile');
};

export function handleSubmitAccount(store, profile, router) {
  return fireApp.database().ref(`/users/${store.state.users.id}/public`).update({
    profile
  }).then(error => {
    if (error) {
      console.log(error);
    } else {
      store.commit({
        type: 'users/setProfile',
        profile
      });

      setLocalProfile(profile);
      router.push(routePaths.kyc());
    }
  });
};
