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
              <q-btn flat no-wrap size="md" label="MARKETS" :to="exchange" />
              <q-btn flat no-wrap size="md" label="PAWN SHOP" />
            </div>
            <div class="lt-md">
              <q-btn flat dense no-wrap size="md" to='/'>
                <img alt="Quasar logo" src="../statics/icons/favicon-32x32.png">
              </q-btn>
            </div>
        </template>
        <template>
            <div class="gt-sm">
              <q-btn @click.native="signOut" label="Sign out" />
              <template v-if="isLogin">
                  <span>
                    <q-btn flat size="md" icon="account_balance_wallet" label="Fund" @click="showingWalletMenu = true" /> |
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
                    <q-btn flat round size="md" icon="account_circle" @click="showingAccountMenu = true" /> |
                    <q-popover anchor="bottom left" v-model="showingAccountMenu">
                      <q-list separator link>
                        <q-item @click.native="signOut">
                          <q-item-side icon="dashboard" color="primary" />
                          <q-item-main label="Dashboard" />
                        </q-item>
                        <q-item @click.native="signOut">
                          <q-item-side icon="alarm_off" color="negative" />
                          <q-item-main label="Logout" />
                        </q-item>
                      </q-list>
                    </q-popover>
                  </span>
              </template>
              <template v-else>
                <q-btn flat no-wrap size="md" label="LOG IN" :to="login" /> |
                <q-btn flat no-wrap size="md" label="REGISTER" :to="register" /> |
              </template>
              <q-btn-dropdown flat label="Language">
                <q-list link>
                  <q-item>
                    <q-item-main>
                      <q-item-tile label>English</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
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

export default {
  name: 'LayoutDefault',
  data () {
    return {
      drawer: false,
      routePaths: routePaths,
      index: routePaths.index(),
      register: routePaths.register(),
      login: routePaths.login(),
      deposits: routePaths.deposits(),
      exchange: routePaths.exchange('ETH_BTC'),
      showingAccountMenu: false,
      showingWalletMenu: false
    };
  },
  computed: {
    isLogin () {
      return this.$store.getters['user/isLogin'];
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
