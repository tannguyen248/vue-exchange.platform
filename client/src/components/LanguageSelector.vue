<template>
  <q-select
    :options="[
      { label: 'English',         value: 'en-us'  },
      { label: 'Vietnamese',      value: 'vi'     }
    ]"
    v-model="lang"
  />
  <!-- <q-btn-dropdown flat label="Language">
    <q-list link>
      <q-item @click.native="handleClick">
        <q-item-main>
          <q-item-tile label>English</q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
  </q-btn-dropdown> -->
</template>

<script>
export default {
  name: 'LanguageSelector',
  data () {
    return {
      lang: this.$q.i18n.lang
    };
  },
  watch: {
    lang (lang) {
      import(`quasar-framework/i18n/${lang}`).then(lang => {
        console.log(lang.default);
        this.$q.i18n.set(lang.default);
      });
    }
  }
};
</script>

<style scoped>

</style>
