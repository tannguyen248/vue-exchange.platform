import { fireApp } from './firebase';

export const setLocalProfile = (profile) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};

export const getLocalProfile = () => {
  return JSON.parse(localStorage.getItem('profile'));
};

export const removeLocalProfile = () => {
  localStorage.removeItem('profile');
};

export function handleSubmitAccount(store, profile) {
  fireApp.database().ref(`/users/${store.state.user.id}/public`).update({
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
    }
  })
};
