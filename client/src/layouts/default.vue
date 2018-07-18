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
              <q-btn flat no-wrap size="md" label="LOG IN" :to="login" /> |
              <q-btn flat no-wrap size="md" label="REGISTER" :to="register" /> |
              <q-btn-dropdown flat label="Language">
                <!-- dropdown content -->
                <q-list link>
                  <q-item  @click="handlerFunction">
                    <q-item-main>
                      <q-item-tile label>English</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="lt-md">
              <q-btn
                flat
                dense
                label="Register"
                :to="register"
              />

              <q-btn
                flat
                label="LOG IN"
                :to="login"
              />

              <q-btn
                @click="drawer = !drawer"
                flat
                round
                dense
                icon="menu"
              />

              <q-layout-drawer side="right" v-model="drawer" :content-class="['bg-primary', 'q-pa-sm']">
                <q-list highlight no-border dark>
                  <q-item :to="register">
                    Register
                  </q-item>
                  <q-item :to="login">
                    LOG IN
                  </q-item>
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
import { openURL } from 'quasar';
import routePaths from '../router/routePaths';

export default {
  name: 'LayoutDefault',
  data () {
    return {
      drawer: false,
      index: routePaths.index(),
      register: routePaths.register(),
      login: routePaths.login(),
      exchange: routePaths.exchange('ETH_BTC')
    };
  },
  methods: {
    openURL,
    handlerFunction: function (event) {
      console.log(event);
    }
  }
};
</script>

<style>
</style>
