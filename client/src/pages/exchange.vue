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
    <div class="row">
      <div class="col-8">
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
      </div>
      <div class="col-4">
        <q-tabs class="q-ma-md" no-pane-border>
          <!-- Tabs - notice slot="title" -->
          <q-tab default slot="title" name="tab-1" label="1" />
          <q-tab slot="title" name="tab-2" label="2" />
          <q-tab slot="title" name="tab-3" label="3" />
          <q-tab slot="title" name="tab-4" label="4" />

          <!-- Targets -->
          <q-tab-pane name="tab-1">
            <q-table
              hide-bottom
              :data="tableData"
              :columns="columns"
              :filter="filter"
              :visible-columns="visibleColumns"
              :separator="separator"
              row-key="name"
              color="secondary"
            >
              <template slot="top-right" slot-scope="props">
                <q-search
                  hide-underline
                  color="secondary"
                  v-model="filter"
                  class="col-6"
                />
              </template>
              <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
            </q-table>
          </q-tab-pane>
          <q-tab-pane name="tab-2">Tab Two</q-tab-pane>
          <q-tab-pane name="tab-3">Tab Three</q-tab-pane>
          <q-tab-pane name="tab-4">Tab Four</q-tab-pane>
          <q-tab-pane name="tab-5">Tab Five</q-tab-pane>
        </q-tabs>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Exchange',
  data () {
    return {
      pair: this.$route.params.pair,
      filter: '',
      separator: 'horizontal',
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
