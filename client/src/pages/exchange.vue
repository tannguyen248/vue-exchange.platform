<template>
  <q-page>
    <div class="row justify-between gutter-lg shadow-1 trading-table" style="padding: 10px">
      <div class="col-6">
        <h6>
          {{ pairInfo.coin }}
        </h6>
        <q-field
          :helper="getHelper"
          icon="payment"
          :label-width="3"
        >
        <q-input
          autofocus
          numeric-keyboard-toggle
          type="number"
          v-model="amount"
        />
        </q-field>
        <q-field
          :helper="getAddressHelper"
          icon="account_balance_wallet"
          :label-width="3"
        >
        <q-input
          type="text"
          v-model="getAddress"
        />
        </q-field>
      </div>
      <div class="col-6">
        <h6>
          {{ pairInfo.base }}
        </h6>
        <q-field
          :helper="payHelper"
          icon="payment"
          :label-width="3"
        >
        <q-input
          readonly
          numeric-keyboard-toggle
          type="number"
          v-model="price"
        />
        </q-field>
        <q-field
          :helper="payAddressHelper"
          icon="account_balance_wallet"
          :label-width="3"
        >
        <q-input
          readonly
          type="text"
          v-model="payAddress"
        />
        </q-field>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'exchange',
  data () {
    return {
      pair: this.$route.params.pair,
      coin: '',
      base: '',
      amount: 1,
      price: 0.001,
      getAddress: '',
      payAddress: ''
    };
  },
  computed: {
    pairInfo () {
      return {
        pair: this.$route.params.pair,
        coin: this.pair.split('_')[0],
        base: this.pair.split('_')[1]
      };
    },
    getHelper () {
      return `You will earn ${this.amount} ${this.pairInfo.coin} at`;
    },
    payHelper () {
      return `You must send ${this.price} ${this.pairInfo.base} to`;
    },
    getAddressHelper () {
      return `Your ${this.pairInfo.coin} wallet address`;
    },
    payAddressHelper () {
      return `The ${this.pairInfo.base} wallet address`;
    }
  },
  methods: {

  },
  watch: {
    '$route' (to, from) {
      this.pair = this.$route.params.pair
    }
  }
};
</script>

<style scoped>
  .trading-table {
    max-width: 80%;
    margin: 10px auto;
  }
</style>
