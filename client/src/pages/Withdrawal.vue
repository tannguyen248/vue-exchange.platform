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
                  <div class="gutter-y-sm row column">
                    <q-field
                      :error-label="$t('message.requiredFiled')"
                      :error="$v.address.$error"
                    >
                      <q-input
                        v-model="address"
                        type="text"
                        :stack-label="$t('label.address')"
                        @blur="$v.address.$touch"
                      />
                    </q-field>
                    <div class="row column">
                      <q-field
                        :error-label="$t('message.withdrawalAtleast', { amount: min, coin: coin.name })"
                        :error="$v.amount.$error"

                      >
                        <q-input
                          v-model="amount"
                          type="number"
                          :suffix="coin.name"
                          :float-label="$t('label.amount')"
                          @blur="$v.amount.$touch"
                        />
                      </q-field>
                      <div class="row justify-end items-center gutter-x-sm">
                        <q-btn
                          dense
                          no-caps
                          outline
                          flat
                          @click="handleAvailableClick"
                        >
                          <span class="q-caption">
                            {{ $t('label.available') }}: <b class="underline">{{available}}</b>
                          </span>
                        </q-btn>

                        <div class="q-caption">
                          {{ $t('label.limit') }}: {{ max }}
                        </div>
                      </div>
                    </div>
                    <div class="row gutter-x-sm">
                      <q-field
                        :error-label="$t('message.withdrawalAtleast', { amount: min, coin: coin.name })"
                        :error="$v.amount.$error"
                        class="col-md-6"
                      >
                        <q-input
                          v-model="fee"
                          type="number"
                          :suffix="coin.name"
                          :float-label="$t('label.fee')"
                          @blur="$v.amount.$touch"
                        />
                      </q-field>
                      <q-field
                        :error-label="$t('message.withdrawalAtleast', { amount: min, coin: coin.name })"
                        :error="$v.amount.$error"
                        class="col-md-6"
                      >
                        <q-input
                          v-model="receiveAmount"
                          type="number"
                          :suffix="coin.name"
                          :float-label="$t('label.youWillGet')"
                          @blur="$v.amount.$touch"
                        />
                      </q-field>
                    </div>

                    <q-btn
                      color="primary"
                      class="block full-width q-mt-md"
                      :label="$t('label.withdrawal')"
                      @click="withdrawal"
                    />
                  </div>
                  <div>
                    <p class="q-subheading">
                      <q-icon name="warning" /> {{ $t('warning.warning') }}
                    </p>
                    <ul>
                      <li>{{ $t('message.withdrawalAtleast', { amount: min, coin: coin.name }) }}</li>
                      <li>{{ $t('warning.withdrawalWarningSecurity') }}</li>
                    </ul>
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
import { required, decimal } from 'vuelidate/lib/validators';

export default {
  data () {
    return {
      selectedCoin: 'BTC',
      address: '',
      amount: 0,
      available: 0.5236,
      min: 0.005,
      max: 2,
      fee: 0.0005,
      receiveAmount: 0
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
    withdrawal: function () {
      this.$v.$touch();
      console.log(this.$v.amount);

      if (!this.$v.$invalid) {
        console.log('Sent');
      }
    },
    handleAvailableClick: function () {
      if (this.available > this.min) {
        this.amount = this.available < this.max ? this.available : this.max;
      }
    }
  },
  validations: {
    address: {
      required
    },
    amount: {
      required,
      decimal,
      between () {
        return this.min <= this.amount && this.amount <= this.max;
      }
    }
  }
};
</script>

<style scoped>

</style>
