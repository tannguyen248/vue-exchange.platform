<template>
  <q-page>
    <div class="fixed fixed-center">
      <q-btn flat no-wrap size="lg" to='/' class="full-width">
        <img alt="Quasar logo" src="../statics/icons/icon-128x128.png">
      </q-btn>
      <q-field
        icon="email"
        :error="!!error"
      >
        <q-input v-model="email" type="email" float-label="Email" autocomplete="nope" autofocus />
      </q-field>

      <q-field
        icon="lock"
        error-label="The email or password is invalid"
        :error="!!error"
      >
        <q-input v-model="password" type="password" float-label="Password" />
      </q-field>
      <div id="reCaptchaCointainer"></div>

      <q-btn id="signInButton" label="Log In" color="primary" class="block full-width q-mt-md" @click="signIn" />
      <span class="q-body-1 float-right">Not On {{ appName }}? <q-btn flat label="Register" :to="register" /></span>
    </div>
  </q-page>
</template>

<script>
import { APP_NAME_PASCAL } from '../utils/const';
import routePaths from '../router/routePaths';

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: '',
      appName: APP_NAME_PASCAL,
      register: routePaths.register(),
      error: ''
    };
  },
  methods: {
    signIn () {
      this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        user => {
          this.$router.push(routePaths.exchange());
        },
        error => {
          console.log(error);
          this.error = 'The email or password is invalid';
        }
      );
    }
  }
};
</script>
