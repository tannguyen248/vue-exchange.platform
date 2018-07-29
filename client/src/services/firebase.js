import firebase from 'firebase';
import {
  setLocalProfile,
  getLocalProfile,
  removeLocalProfile
} from './account';
import { isValidFileSize } from '../utils/helpers';

const config = {
  apiKey: 'AIzaSyAeJxukIMeNwUsqdcrx28efE1-OHe8Jo64',
  authDomain: 'vue-firebase-bd176.firebaseapp.com',
  databaseURL: 'https://vue-firebase-bd176.firebaseio.com',
  projectId: 'vue-firebase-bd176',
  storageBucket: 'vue-firebase-bd176.appspot.com',
  messagingSenderId: '938077555990'
};

const fireApp = firebase.initializeApp(config);

export { fireApp };

const saveMessagingDeviceToken = () => {
  fireApp.messaging().getToken().then(function(currentToken) {
    if (currentToken) {
      fireApp.database().ref('/fcmTokens').child(currentToken)
        .set(fireApp.auth().currentUser.uid);
    } else {
      requestNotificationsPermissions();
    }
  }).catch(function(error) {
    console.error('Unable to get messaging token.', error);
  });
};

// Requests permissions to show notifications.
const requestNotificationsPermissions = () => {
  fireApp.messaging().requestPermission().then(function() {
    saveMessagingDeviceToken();
  }).catch(function(error) {
    console.error('Unable to get permission to notify.', error);
  });
};

const loadPublicInfomation = (user, store) => {
  fireApp.database().ref(`/users/${user.uid}/public/`).on('value', (snap) => {
    let data = snap.val();

    if (data) {
      store.commit({
        type: 'users/setUser',
        id: user.uid,
        addresses: data.addresses
      });

      store.commit({
        type: 'users/setProfile',
        profile: data.profile
      });

      setLocalProfile(data.profile);
    }
  });
};

const handleAuthStateChange = (user, store) => {
  if (user) {
    loadPublicInfomation(user, store);
    saveMessagingDeviceToken();

    if (!user.emailVerified) {
      user.sendEmailVerification().then(function() {
        // Email sent.
      }).catch(function(error) {
        console.log(error);
      });
    }
  } else {
    store.commit({
      type: 'users/setUser',
      id: null,
      addresses: null
    });

    store.commit({
      type: 'users/setProfile',
      profile: null
    });

    removeLocalProfile();
  }
};

const loadInitProfle = (store) => {
  let profile = getLocalProfile();
  if (profile) {
    store.commit({
      type: 'users/setProfile',
      profile: profile
    });
  }
};

export const saveImage = (file, filename) => {
  let name = filename || file.name;
  if (isValidFileSize(file)) {
    var filePath = fireApp.auth().currentUser.uid + '/verification/' + name;
    return fireApp.storage().ref(filePath).put(file);
  }
};

export default {
  // Initiate firebase auth.
  initFirebaseAuth: (app) => {
    return new Promise(resolve => {
      fireApp.auth().onAuthStateChanged(user => {
        handleAuthStateChange(user, app.store, app.router);
        loadInitProfle(app.store);
        resolve(true);
      });
    });
  },

  // Returns true if a user is signed-in.
  isUserSignedIn: () => {
    return !!fireApp.auth().currentUser;
  }
};
