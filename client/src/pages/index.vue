<template>
  <q-page>
    <q-carousel arrows infinite autoplay quick-nav class="text-white" height="256px">
      <q-carousel-slide img-src="../statics/icons/icon-512x512.png">
      </q-carousel-slide>
      <q-carousel-slide img-src="../statics/icons/icon-512x512.png">
      </q-carousel-slide>
      <q-carousel-slide img-src="../statics/icons/icon-512x512.png">
      </q-carousel-slide>
    </q-carousel>

    <q-tabs class="q-ma-md">
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
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data: () => ({
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
    ],
    visibleColumns: ['pair', 'coin', 'price'],
    separator: 'horizontal',
    filter: ''
  }),
  methods: {
    rowClick (selected) {
      this.$router.push({ path: `exchange/${selected.pair.replace('/', '_')}` });
      console.log(selected);
    }
  }
};
</script>

<style scoped>
  .q-table-container {
    box-shadow: none;
  }
</style>
