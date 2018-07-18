<template>
  <q-page padding>
    <div class="row gutter-sm">
      <div class="col-lg-7">
        <div class="row shadow-1 justify-between q-pa-lg">
          <div class="col-md-5">
            <div class="q-title q-mb-md">
              {{ pairInfo.coin }}
            </div>
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
          <div class="col-md-5 offset-md-2">
            <div class="q-title q-mb-md">
              {{ pairInfo.base }}
            </div>
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
                class="no-margin"
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
                class="no-margin"
              />
            </q-field>
          </div>
          <div class="col-12 q-mt-sm">
            <q-btn class="float-right" label="BUY NOW" color="positive"/>
          </div>
        </div>
        <div class="shadow-1 q-mt-md">
          <q-collapsible group="somegroup" icon="explore" label="Is it safe?">
            <div>
              Seller's Bitcoin is hold in an escrow when you open the trade, so you can send payment to seller without worry. If the seller refused to release Bitcoin after you sent the payment, click on the 'Dispute' button and our support team with show up to help.
            </div>
          </q-collapsible>
          <q-collapsible group="somegroup" icon="explore" label="When will I receive coin?">
            <div>
              You will receive Bitcoin immediately after seller has confirmed your payment.
            </div>
          </q-collapsible>
        </div>
      </div>
      <div class="col-lg-5">
        <q-card color="dark">
          <q-card-title>
            Term of trade
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            FASTEST RELEASE OF BITCOIN
            *** ATM or OVER THE COUNTER CASH DEPOSIT ***
          </q-card-main>
          <q-card-main>
            Hi my name is Mitch. Thank you for starting a trade with me. I'll try and be as fast and efficient as possible for you. If I am not available online, please don't hesitate to TXT - 0412 482 616

            Please follow the procedure below for the perfect outcome:
          </q-card-main>
          <q-card-main>
            1/ Only open a trade if you plan on going to DEPOSIT THE CASH at the ATM or OVER THE COUNTER - WITHIN 1.5 HOUR. If you can't make it to the BANK within 1.5 hours then please WAIT and open the trade later when you know you can make the payment.

            Many thanks.
            DON'T FORGET - MOST BANKS CLOSE AT 4PM.
          </q-card-main>
          <q-card-main>
            2/ **WARNING WARNING** PLEASE be aware that the fastest way to get your BITCOIN is via CASH DEPOSIT. This will clear immediately. This price is discounted for CASH ONLY purchases.
          </q-card-main>
          <q-card-main>
            3/ I reserve the right to cancel this trade and refund your payment.
            Please use the following payment methods to purchase Bitcoin safely :
            ***Cash Deposit at ATM  ***Cash Deposit Branch Over Counter
            COMMONWEALTH BANK OF AUSTRALIA <br />
            BSB - 063 009 <br />
            ACCOUNT NUMBER  - 1061 6634 <br />

            *** Please UPLOAD Proof of Payment IMMEDIATELY ***
            THANK YOU FOR TRADING
          </q-card-main>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'ExchangeTrading',
  data () {
    return {
      pair: 'ETH_BTC',
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
        pair: 'ETH_BTC',
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

  }
};
</script>

<style scoped>
  .trading-table {
    max-width: 80%;
    margin: 10px auto;
  }
</style>
