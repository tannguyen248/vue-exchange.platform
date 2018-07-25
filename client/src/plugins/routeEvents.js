import axios from 'axios';

export default ({ app, router, store, Vue }) => {
  router.afterEach((to, from) => {
    if (store.state.user && store.state.users.addresses && store.state.users.addresses.btc) {
      let address = store.state.users.addresses.btc.test;

      axios({
        method: 'GET',
        url: `https://api.blockcypher.com/v1/btc/test3/addrs/${address}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res.data);
        console.log('balance', res.data.balance);
      }).catch(err => console.log(err));
    }
  });
};
