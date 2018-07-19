import firebase from 'firebase';
import routePaths from '../router/routePaths';

var config = {
  apiKey: 'AIzaSyAeJxukIMeNwUsqdcrx28efE1-OHe8Jo64',
  authDomain: 'vue-firebase-bd176.firebaseapp.com',
  databaseURL: 'https://vue-firebase-bd176.firebaseio.com',
  projectId: 'vue-firebase-bd176',
  storageBucket: 'vue-firebase-bd176.appspot.com',
  messagingSenderId: '938077555990'
};

export const fireApp = firebase.initializeApp(config);

export default ({ app, router, store, Vue }) => {
  Vue.prototype.$firebase = fireApp;

  const authStateObserver = (user) => {
    console.log('user', user);
    if (user) {
      // We save the Firebase Messaging Device token and enable notifications.
      store.commit({
        type: 'user/setUser',
        id: user.uid
      });

      saveMessagingDeviceToken();
    } else {
      store.commit({
        type: 'user/setUser',
        id: null
      });
    }
  }

  const saveMessagingDeviceToken = () => {
    fireApp.messaging().getToken().then(function(currentToken) {
      if (currentToken) {
        console.log('Got FCM device token:', currentToken);
        // Saving the Device Token to the datastore.
        fireApp.database().ref('/fcmTokens').child(currentToken)
          .set(fireApp.auth().currentUser.uid);
      } else {
        // Need to request permissions to show notifications.
        requestNotificationsPermissions();
      }
    }).catch(function(error) {
      console.error('Unable to get messaging token.', error);
    });
  }

  // Requests permissions to show notifications.
  const requestNotificationsPermissions = () => {
    console.log('Requesting notifications permission...');
    fireApp.messaging().requestPermission().then(function() {
      // Notification permission granted.
      saveMessagingDeviceToken();
    }).catch(function(error) {
      console.error('Unable to get permission to notify.', error);
    });
  }

  fireApp.auth().onAuthStateChanged(authStateObserver);

  router.beforeEach((to, from, next) => {
    let currentUser = fireApp.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) {
      next(routePaths.login());
    } else {
      next();
    }
  });
};
