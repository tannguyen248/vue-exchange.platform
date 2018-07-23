import firebase, { fireApp } from '../services/firebase';

export default ({ app, Vue }) => {
  Vue.prototype.$firebase = fireApp;

  firebase.initFirebaseAuth(app).then(() => {
    /* eslint-disable-next-line no-new */
    new Vue(app);
  });
};
