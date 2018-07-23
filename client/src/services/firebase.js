import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAeJxukIMeNwUsqdcrx28efE1-OHe8Jo64',
  authDomain: 'vue-firebase-bd176.firebaseapp.com',
  databaseURL: 'https://vue-firebase-bd176.firebaseio.com',
  projectId: 'vue-firebase-bd176',
  storageBucket: 'vue-firebase-bd176.appspot.com',
  messagingSenderId: '938077555990'
};

export const fireApp = firebase.initializeApp(config);

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
  fireApp.database().ref(`/users/${user.uid}/public/addresses`).once('value').then((snap) => {
    let data = snap.val();

    store.commit({
      type: 'user/setUser',
      id: user.uid,
      addresses: data
    });
  });
};

const handleAuthStateChange = (user, store, router) => {
  if (user) {
    loadPublicInfomation(user, store);
    saveMessagingDeviceToken();
  } else {
    store.commit({
      type: 'user/setUser',
      id: null,
      addresses: null
    });

    router.push('/')
  }
};

export default {
  // Initiate firebase auth.
  initFirebaseAuth: (app) => {
    return new Promise(resolve => {
      fireApp.auth().onAuthStateChanged(user => {
        handleAuthStateChange(user, app.store, app.router);
        resolve(true);
      });
    });
  },

  // Returns true if a user is signed-in.
  isUserSignedIn: () => {
    return !!fireApp.auth().currentUser;
  }
};
