<template>
  <q-page>
    <div class="fixed fixed-center row column gutter-y-sm sign-in-container">
      <q-btn flat no-wrap size="lg" to='/' class="full-width">
        <img alt="Quasar logo" src="../statics/icons/icon-128x128.png">
      </q-btn>
      <q-field
        icon="email"
        :error="!!error"
      >
        <q-input
          v-model="email"
          type="email"
          float-label="Email"
          autocomplete="nope"
          @keyup.enter="signIn"
        />
      </q-field>

      <q-field
        icon="lock"
        error-label="The email or password is invalid"
        :error="!!error"
      >
        <q-input
          v-model="password"
          type="password"
          float-label="Password"
          @keyup.enter="signIn"
        />
      </q-field>
      <div id="reCaptchaCointainer"></div>

      <q-btn
        id="signInButton"
        label="Log In"
        color="primary"
        class="block full-width q-mt-md"
        :loading="isLoading"
        @click="signIn"
      />

      <span class="q-body-1 self-end">
        Not On {{ appName }}? <q-btn flat label="Register" :to="register" />
      </span>
    </div>
  </q-page>
</template>

<script>
import { APP_NAME_PASCAL } from '../utils/const';
import routePaths from '../router/routePaths';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: '',
      appName: APP_NAME_PASCAL,
      register: routePaths.register(),
      serverError: false,
      isLoading: false
    };
  },
  computed: {
    error () {
      return this.$v.email.$error || this.$v.password.$error || this.serverError;
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    signIn () {
      this.$v.password.$touch();
      this.$v.email.$touch();

      if (this.error && this.$v.$invalid) {
        return;
      }

      if (!this.isLoading) {
        this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          user => {
            this.$router.push(routePaths.exchange());
          },
          error => {
            console.log(error);
            this.serverError = true;
            this.isLoading = false;
          }
        );

        this.isLoading = true;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.sign-in-container {
  width: 300px;
}
</style>
