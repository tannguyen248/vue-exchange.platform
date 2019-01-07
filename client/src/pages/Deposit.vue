<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-8">
          <q-tabs @select="selectCoin" align="left">
            <q-tab slot="title" v-for="(coin, index) in coins" :key="index" :name="coin.name" :label="coin.name" :default="selectedCoin === coin.name">
            </q-tab>

            <q-tab-pane v-for="(coin, index) in coins" :key="index" :name="coin.name">
              <q-card flat>
                <q-card-title>
                  <div class="q-headline">{{ coin.name }}</div>
                </q-card-title>
                <q-card-main class="gutter-y-sm">
                  <div class="q-body-1 text-red">
                    <q-icon name="warning" />
                    {{ $t('warning.matchingCoinAddress', { coinName: coin.name }) }}
                  </div>
                  <div class="row column items-center gutter-y-sm">
                    <div>
                      <span class="q-title q-mr-sm vertical-middle">{{ coin.address }}</span>
                      <q-btn
                        outline
                        no-caps
                        dense
                        size="md"
                        @click="copyAddress"
                        :label="$t('label.copyAddress')"
                        icon="file_copy"
                      />
                    </div>
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

export default {
  name: 'Deposit',
  components: {
    QrcodeVue
  },
  data () {
    return {
      selectedCoin: 'BTC'
    };
  },
  computed: {
    coins () {
      const keys = Object.keys(this.$store.state.users.addresses);

      let coins = keys.map((x) => {
        return {
          name: x.toUpperCase(),
          address: this.$store.state.users.addresses[x]
        };
      });

      coins[1] = {
        name: 'ETH',
        address: '213sdfdfdsf',
        default: false
      };

      return coins;
    }
  },
  methods: {
    selectCoin: function (name) {
      this.selectedCoin = name;
    },
    copyAddress: function () {
      let coin = this.coins.find(x => x.name === this.selectedCoin);
      if (coin) {
        this.$copyText(coin.address).then((e) => {
          this.$q.notify({
            message: (this.$t('message.addressCopied')),
            position: 'top',
            type: 'positive'
          });
        }, function (e) {
          this.$q.notify({
            message: (this.$t('message.unableCopy')),
            position: 'top'
          });
        })
      }
    }
  }
};
</script>
