import { fireApp } from './firebase';
import routePaths from '../router/routePaths';

export const setLocalUser = (user) => {
  if (user) {
    user.id = '';
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getLocalUser = () => {
  try {
    let user = localStorage.getItem('user');

    if (user) {
      return JSON.parse(user);
    }

    return null;
  } catch (error) {
    console.log(error);
    removeLocalUser();

    return null;
  }
};

export const removeLocalUser = () => {
  localStorage.removeItem('user');
};

export const setLocalProfile = (profile) => {
  if (profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }
};

export const getLocalProfile = () => {
  var profile = localStorage.getItem('profile');

  if (profile) {
    return JSON.parse(profile);
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

      router.push(routePaths.kyc());
    }
  });
};
