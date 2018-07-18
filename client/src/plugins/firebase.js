import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAeJxukIMeNwUsqdcrx28efE1-OHe8Jo64',
  authDomain: 'vue-firebase-bd176.firebaseapp.com',
  databaseURL: 'https://vue-firebase-bd176.firebaseio.com',
  projectId: 'vue-firebase-bd176',
  storageBucket: 'vue-firebase-bd176.appspot.com',
  messagingSenderId: '938077555990'
};

export const fireApp = firebase.initializeApp(config)

export default ({ app, router, Vue }) => {
  Vue.prototype.$firebase = fireApp
}
