<template>
  <q-page>
    <div class="fixed fixed-center row column sign-up-container gutter-y-sm">
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
          autofocus
        />
      </q-field>

      <q-field
        icon="lock"
        :error="!!error"
        error-label="The email or password is invalid"
      >
        <q-input
          v-model="password"
          type="password"
          float-label="Password"
          @keyup.enter="signIn"
        />
      </q-field>

      <q-field
        icon="lock"
        error-label="Passwords do not match"
        :error="$v.rePassword.$error"
      >
        <q-input
          v-model="rePassword"
          type="password"
          float-label="Confirm Password"
          @keyup.enter="signIn"
          @blur="$v.rePassword.$touch"
        />
      </q-field>

      <q-btn label="Register" color="primary" class="block full-width q-mt-md" @click="signUp" />
      <span class="q-body-1 self-end">Already Registered? <q-btn flat label="LOG IN" to="/login" /></span>
    </div>
  </q-page>
</template>

<script>
import routePaths from '../router/routePaths';
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: '',
      rePassword: '',
      serverError: false
    };
  },
  computed: {
    error () {
      return this.serverError || this.$v.email.$error || this.$v.password.$error;
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
    },
    rePassword: {
      required,
      sameAs: sameAs('password')
    }
  },
  methods: {
    signUp () {
      this.$v.email.$touch();
      this.$v.password.$touch();

      if (this.error && this.$v.$invalid) {
        return;
      }

      this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        user => {
          this.$router.push(routePaths.exchange());
        },
        error => {
          console.log(error);
          this.serverError = true;
        }
      );
    }
  }
};
</script>

.<style lang="stylus" scoped>
.sign-up-container {
  width: 300px;
}
</style>
