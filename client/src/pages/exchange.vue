<template>
  <q-page>
    <div class="intro-tex row justify-around">
      <div class="intro col-md-5 column justify-around">
        <div class="q-title">
          Peer To Peer <br/>
          Bitcoin Exchange
        </div>
        <div class="q-caption">FAST - SAFE - SIMPLE</div>
        <div class="trade row justify-between no-wrap">
          <div class="buy-price q-ma-md">
            <div class="text-bold text-no-wrap q-mb-sm">0.00002038</div>
            <q-btn
              label="Buy Now"
              color="positive"
            />
          </div>
          <div class="sell-price q-ma-md">
            <div class="text-bold text-no-wrap q-mb-sm">0.00002040</div>
            <q-btn
              label="Sell Now"
              color="negative"
            />
          </div>
        </div>
      </div>
      <div class="intro-video col-md-6">
        <q-video
          src="//www.youtube.com/embed/pV7d4fzPEKc?hl=undefined&amp;cc_lang_pref=undefined&amp;rel=0&amp;cc_load_policy=1&amp;showinfo=0&amp;controls=0"
          style="height: 100%" />
      </div>
    </div>
    <div class="q-pa-md">
      <div class="q-title q-mb-md">Sellers</div>
      <q-table
        hide-header
        :data="tableData"
        :columns="columns"
        :visible-columns="visibleColumns"
        row-key="name"
        color="secondary"
        class="q-mb-lg"
      >
        <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer">
          <q-td>
            <span class="q-subheading">
              <b class="text-positive">{{ props.row.price }}</b> {{ base }}/{{ coin }}
            </span> via Address
            <br/>
            <i> <b>Maximun:</b> {{ props.row.maximum }} </i>
            <br/>
            <q-icon name="account_circle" /> {{ props.row.author }}
          </q-td>
          <q-td class="actions">
            <q-btn label="Buy" to='/offer/id' />
          </q-td>
        </q-tr>
      </q-table>
    </div>

    <div class="q-pa-md">
      <div class="q-title q-mb-md">Buyers</div>
      <q-table
        hide-header
        :data="tableData"
        :columns="columns"
        :visible-columns="visibleColumns"
        row-key="name"
        color="secondary"
      >
        <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer">

          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Exchange',
  data () {
    return {
      pair: this.$route.params.pair,
      tableData: [
        {
          price: '0.00002040',
          maximum: '11',
          author: 'Minju'
        },
        {
          price: '0.00002040',
          maximum: '11',
          author: 'abc'
        },
        {
          price: '0.00002040',
          maximum: '11',
          author: 'Minju'
        },
        {
          price: '0.00002040',
          maximum: '11',
          author: 'Minju'
        },
        {
          price: '0.00002040',
          maximum: '11',
          author: 'Minju'
        },
        {
          price: '0.00002040',
          maximum: '11',
          author: 'Minju'
        },
        {
          price: '0.00002040',
          maximum: '11',
          author: 'Minju'
        },
        {
          price: '0.00002040',
          maximum: '11',
          author: 'Minju'
        },
        {
          price: '0.00002040',
          maximum: '11',
          author: 'Minju'
        }
      ],
      columns: [
        {
          name: 'price',
          required: true,
          label: 'Price',
          align: 'left',
          field: 'price'
        },
        {
          name: 'maximum',
          required: true,
          label: 'Maximum',
          align: 'left',
          field: 'maximum'
        },
        {
          name: 'trader',
          label: 'Trader',
          align: 'left',
          field: 'trader',
          required: true
        }
      ],
      visibleColumns: ['price', 'maximum', 'trader']
    };
  },
  computed: {
    coin () {
      return this.pair.split('_')[0];
    },
    base () {
      return this.pair.split('_')[1];
    }
  },
  methods: {
    rowClick (data) {
      console.log(data);
    }
  }
};
</script>

<style lang="stylus" scoped>
  .intro-tex {
    width: 100%;
    border: 1px solid black;
    margin: 10px 0;
    padding: 15px 10px;
    background-image: url("../statics/icons/icon-512x512.png");
    min-height: 250px;
  }

  .intro {
    text-align: center;
  }

  .actions {
    text-align: right;
  }
</style>
