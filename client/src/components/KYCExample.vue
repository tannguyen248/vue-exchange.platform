<template>
  <q-card flat>
    <q-card-title>
      {{ label }}
    </q-card-title>
    <q-card-main class="example-container">
      <img :src="imageSource" />
    </q-card-main>
  </q-card>
</template>

<script>
export default {
  props: [
    'label',
    'imageSource'
  ]
};
</script>

<style lang="stylus" scoped>
.example-container {
  img {
    height: 197px;
  }
}
</style>
