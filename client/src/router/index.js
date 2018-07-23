import Vue from 'vue';
import VueRouter from 'vue-router';
import routePaths from './routePaths';
import routes from './routes';
import { fireApp } from '../services/firebase';

Vue.use(VueRouter);

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
});

Router.beforeEach((to, from, next) => {
  console.log(Vue);
  let user = fireApp.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    if (!user) {
      next(routePaths.login());
    } else {
      next();
    }
  } else {
    if (user && to.path === routePaths.login()) {
      next(routePaths.exchange());
    } else {
      next();
    }
  }
});

export default Router;
