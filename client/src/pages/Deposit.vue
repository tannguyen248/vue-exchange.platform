<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-8">
          <q-tabs>
            <q-tab slot="title" v-for="(coin, index) in coins" :key="index" :name="coin.name" :label="coin.name" :default="coin.default">
            </q-tab>

            <q-tab-pane v-for="(coin, index) in coins" :key="index" :name="coin.name">
              <q-card>
                <q-card-title>
                  <div class="q-headline">{{ coin.name }}</div>
                </q-card-title>
                <q-card-main>
                  <div class="q-body-1 text-red"><q-icon name="warning" /> Send only <b>{{ coin.name }}</b> to this deposit address. Sending any other coin or token to this address may result in the loss of your deposit.</div>
                  <div class="row justify-center">
                    <h5 class="q-title">{{ coin.address }}</h5>
                    <qrcode-vue :value="coin.address" size="300" level="H"></qrcode-vue>
                  </div>
                </q-card-main>
              </q-card>
            </q-tab-pane>
          </q-tabs>
      </div>
      <div class="col-md-4"></div>
    </div>
  </q-page>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import VueClipboard from 'vue-clipboard2'

export default {
  name: 'Deposit',
  components: {
    QrcodeVue,
    VueClipboard
  },
  data () {
    return {

    };
  },
  computed: {
    coins () {
      const keys = Object.keys(this.$store.state.user.addresses);
      let coins = keys.map((x, index) => {
        return {
          name: x.toUpperCase(),
          address: this.$store.state.user.addresses[x] && this.$store.state.user.addresses[x].test,
          default: index === 0
        }
      });

      console.log(coins);
      return coins;
    }
  }
};
</script>
