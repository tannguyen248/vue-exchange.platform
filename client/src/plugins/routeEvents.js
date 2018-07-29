import axios from 'axios';
import routePaths from '../router/routePaths';

const getAccountBalance = (store) => {
  if (store.state.users && store.state.users.addresses) {
    let address = store.state.users.addresses.btc;

    axios({
      method: 'GET',
      url: `https://api.blockcypher.com/v1/btc/main/addrs/${address}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res.data);
      console.log('balance', res.data.balance);
    }).catch(err => console.log(err));
  }
};

const redirectWhenNotSubmitProfile = (router, store) => {
  router.beforeEach((to, from, next) => {
    console.log(to.path);
    if (to.path === routePaths.kyc()) {
      if (!store.state.users || !store.state.users.profile) {
        next(routePaths.profile());
      } else {
        next();
      }
    } else {
      next();
    }
  });
};

export default ({ app, router, store, Vue }) => {
  redirectWhenNotSubmitProfile(router, store);

  router.afterEach((to, from) => {
    getAccountBalance(store);
  });
};
