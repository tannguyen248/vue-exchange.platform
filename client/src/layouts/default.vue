<template>
  <q-layout view="lhh lpr lff">
    <q-layout-header reveal>
      <q-toolbar
        color="primary"
        class="row no-wrap justify-between"
      >
        <template>
            <div class="gt-sm">
              <q-btn flat no-wrap size="lg" to='/'>
                <img alt="Quasar logo" src="../statics/icons/favicon-32x32.png">&nbsp;QUASAR
              </q-btn>
              <q-btn flat no-wrap size="md" :label="$t('label.markets')" :to="exchange" />
              <q-btn flat no-wrap size="md" :label="$t('label.pawnShop')" />
            </div>
            <div class="lt-md">
              <q-btn flat dense no-wrap size="md" to='/'>
                <img alt="Quasar logo" src="../statics/icons/favicon-32x32.png">
              </q-btn>
            </div>
        </template>
        <template>
            <div class="gt-sm row justify-end items-stretch gutter-x-sm">
              <q-btn @click.native="signOut" label="Sign out" />
              <span v-if="isLogin">
                  <span>
                    <q-btn flat size="md" icon="account_balance_wallet" label="Fund" @click="showingWalletMenu = true" />
                    <q-popover anchor="bottom left" v-model="showingWalletMenu">
                      <q-list separator link>
                        <q-item to="/">
                          Balances
                        </q-item>
                        <q-item :to="routePaths.deposits()">
                          Deposits
                        </q-item>
                        <q-item>
                          Withdrawals
                        </q-item>
                        <q-item>
                          Transaction History
                        </q-item>
                      </q-list>
                    </q-popover>
                  </span>
                  <span>
                    <q-btn flat round size="md" icon="account_circle" @click="showingAccountMenu = true" />
                    <q-popover anchor="bottom left" v-model="showingAccountMenu">
                      <q-list separator link>
                        <q-item :to="profile">
                          <q-item-side icon="person" color="primary" />
                          <q-item-main :label="$t('label.profile')" />
                        </q-item>
                        <q-item :to="kyc">
                          <q-item-side icon="verified_user" color="primary" />
                          <q-item-main :label="$t('label.verifyAccount')" />
                        </q-item>
                        <q-item @click.native="signOut">
                          <q-item-side icon="alarm_off" color="negative" />
                          <q-item-main :label="$t('label.logout')" />
                        </q-item>
                      </q-list>
                    </q-popover>
                  </span>
              </span>
              <span v-else>
                <q-btn flat no-wrap size="md" label="LOG IN" :to="login" />
                <q-btn flat no-wrap size="md" label="REGISTER" :to="register" />
              </span>
              <LanguageSelector />
            </div>
            <div class="lt-md">
              <template v-if="!isLogin">
                <q-btn
                  flat
                  dense
                  label="Register"
                  :to="register"
                />

                <q-btn
                  flat
                  label="Log In"
                  :to="login"
                />
              </template>

              <q-btn
                @click="drawer = !drawer"
                flat
                round
                dense
                icon="menu"
              />

              <q-layout-drawer side="right" v-model="drawer" :content-class="['bg-primary', 'q-pa-sm']">
                <q-list highlight no-border dark>
                  <template v-if="isLogin">
                    <q-item @click="signOut">
                      Log out
                    </q-item>
                  </template>
                  <template v-else>
                    <q-item :to="register">
                      Register
                    </q-item>
                    <q-item :to="login">
                      Log In
                    </q-item>
                  </template>
                  <q-item to="/">
                    Home
                  </q-item>
                  <q-item :to="exchange">
                    Markets
                  </q-item>
                  <q-item>
                    Pawn shop
                  </q-item>
                </q-list>
              </q-layout-drawer>
            </div>
        </template>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-layout-footer color="primary">

    </q-layout-footer>
  </q-layout>
</template>

<script>
import routePaths from '../router/routePaths';
import LanguageSelector from '../components/LanguageSelector';

export default {
  name: 'LayoutDefault',
  components: {
    LanguageSelector
  },
  data () {
    return {
      drawer: false,
      routePaths: routePaths,
      index: routePaths.index(),
      register: routePaths.register(),
      login: routePaths.login(),
      deposits: routePaths.deposits(),
      exchange: routePaths.exchange('ETH_BTC'),
      profile: routePaths.profile(),
      kyc: routePaths.kyc(),
      showingAccountMenu: false,
      showingWalletMenu: false
    };
  },
  computed: {
    isLogin () {
      return this.$store.getters['users/isLogin'];
    }
  },
  methods: {
    signOut () {
      this.$firebase.auth().signOut();
      this.$router.go(this.$router.currentRoute);
    }
  }
};
</script>

<style>
</style>
