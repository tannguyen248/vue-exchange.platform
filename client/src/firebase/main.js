import { fireApp as firebase }  from '../plugins/firebase';

export default {
  // Signs-in Friendly Chat.
  signIn (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  signUp (email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  },

  // Signs-out of Friendly Chat.
  signOut () {
    firebase.auth().signOut();
  },

  // Initiate firebase auth.
  initFirebaseAuth () {
    firebase.auth().onAuthStateChanged(authStateObserver);
  },

  // Returns the signed-in user's profile Pic URL.
  getProfilePicUrl () {
    return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
  },

  // Returns the signed-in user's display name.
  getUserName () {
    return firebase.auth().currentUser.displayName;
  },

  // Returns true if a user is signed-in.
  isUserSignedIn () {
    return !!firebase.auth().currentUser;
  },

  checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
      window.alert('You have not configured and imported the Firebase SDK. ' +
          'Make sure you go through the codelab setup instructions and make ' +
          'sure you are running the codelab using `firebase serve`');
    }
  },

  // Saves the messaging device token to the datastore.
  saveMessagingDeviceToken () {
    firebase.messaging().getToken().then(function(currentToken) {
      if (currentToken) {
        console.log('Got FCM device token:', currentToken);
        // Saving the Device Token to the datastore.
        firebase.database().ref('/fcmTokens').child(currentToken)
            .set(firebase.auth().currentUser.uid);
      } else {
        // Need to request permissions to show notifications.
        requestNotificationsPermissions();
      }
    }).catch(function(error){
      console.error('Unable to get messaging token.', error);
    });
  },

  // Requests permissions to show notifications.
  requestNotificationsPermissions () {
    console.log('Requesting notifications permission...');
    firebase.messaging().requestPermission().then(function() {
      // Notification permission granted.
      saveMessagingDeviceToken();
    }).catch(function(error) {
      console.error('Unable to get permission to notify.', error);
    });
  },

  authStateObserver (user) {
    if (user) {
      // User is signed in!
      // Get the signed-in user's profile pic and name.
      console.log(user);
      var profilePicUrl = getProfilePicUrl();
      var userName = getUserName();

      // // Set the user's profile pic and name.
      // userPicElement.style.backgroundImage = 'url(' + profilePicUrl + ')';
      // userNameElement.textContent = userName;

      // // Show user's profile and sign-out button.
      // userNameElement.removeAttribute('hidden');
      // userPicElement.removeAttribute('hidden');
      // signOutButtonElement.removeAttribute('hidden');

      // // Hide sign-in button.
      // signInButtonElement.setAttribute('hidden', 'true');

      // We save the Firebase Messaging Device token and enable notifications.
      saveMessagingDeviceToken();
    } else {
      // User is signed out!
      // Hide user's profile and sign-out button.
      // userNameElement.setAttribute('hidden', 'true');
      // userPicElement.setAttribute('hidden', 'true');
      // signOutButtonElement.setAttribute('hidden', 'true');

      // // Show sign-in button.
      // signInButtonElement.removeAttribute('hidden');
    }
  }
}
