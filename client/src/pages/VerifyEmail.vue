<template>
  <q-page>
    <q-card>
      <q-card-title>
        Xác thực email
      </q-card-title>
      <q-card-main>
        Bạn phải vào email {{ $firebase.auth().currentUser.email }} để xác thực
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
