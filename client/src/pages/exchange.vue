<template>
  <q-page>
    <div class="intro-tex row justify-around">
      <div class="intro">
        <div class="q-title">
          Peer To Peer <br/>
          Bitcoin Exchange
        </div>
        <div class="q-subheading">FAST - SAFE - SIMPLE</div>
        <div class="trade row justify-between no-wrap">
          <div class="buy-price q-ma-md">
            <div class="text-bold text-no-wrap q-mb-sm">0.00002038 BTC</div>
            <q-btn
              label="Buy Now"
              color="positive"
            />
          </div>
          <div class="sell-price q-ma-md">
            <div class="text-bold text-no-wrap q-mb-sm">0.00002040 BTC</div>
            <q-btn
              label="Sell Now"
              color="negative"
            />
          </div>
        </div>
      </div>
      <div class="intro-video">
        <iframe class="embed-responsive-item" src="//www.youtube.com/embed/pV7d4fzPEKc?hl=undefined&amp;cc_lang_pref=undefined&amp;rel=0&amp;cc_load_policy=1&amp;showinfo=0&amp;controls=0"></iframe>
      </div>
    </div>
    <div>
      <div class="q-title">Sellers</div>
      <q-table
        hide-headere
        :data="tableData"
        :columns="columns"
        :filter="filter"
        :visible-columns="visibleColumns"
        :separator="separator"
        row-key="name"
        color="secondary"
        class="q-mb-lg"
      >
        <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </q-table>
    </div>

    <div>
      <div class="q-title">Buyers</div>
      <q-table
        hide-header
        :data="tableData"
        :columns="columns"
        :filter="filter"
        :visible-columns="visibleColumns"
        :separator="separator"
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
          pair: '11/1',
          coin: '11',
          price: '1'
        },
        {
          pair: '12/1',
          coin: '12',
          price: '2'
        }
      ],
      columns: [
        {
          name: 'pair',
          required: true,
          label: 'Pair',
          align: 'left',
          field: 'pair',
          sortable: true
        },
        {
          name: 'coin',
          required: false,
          label: 'C',
          align: 'left',
          field: 'coin',
          sortable: true
        },
        {
          name: 'price',
          label: 'Price',
          align: 'left',
          field: 'price',
          sortable: true
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
  .intro-tex {
    width: 100%;
    border: 1px solid black;
    margin: 10px 0;
    padding: 15px 10px;
  }

  .intro {
    text-align: center;
  }
</style>
