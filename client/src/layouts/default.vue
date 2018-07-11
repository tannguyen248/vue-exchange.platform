<template>
  <q-layout view="lhh lpr lff">
    <q-layout-header reveal>
      <q-toolbar
        color="primary"
      >
        <q-toolbar-title>
          <q-tabs
            two-lines='false'>
            <q-route-tab
              icon="mail"
              to="/mails"
              exact
              slot="title"
            />
            <q-route-tab
              icon="alarm"
              to="/alarms"
              exact
              slot="title"
            />
          </q-tabs>
        </q-toolbar-title>
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

export default {
  name: 'LayoutDefault',
  data () {
    return {};
  },
  methods: {
    openURL
  }
};
</script>

<style>
</style>
