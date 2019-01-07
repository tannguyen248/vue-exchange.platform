<template>
  <div class="fixed fixed-center">
    <div class="q-title">
        <p class="q-headline">
          <q-icon name="check_circle" color="positive" />
          {{ $t('content.kycVerifiedTitle') }}
        </p>
        <div class="row">
          <div class="row">
            <div class="col-6">
              {{ $t('label.nationality') }}
            </div>
            <div class="col-6">
              {{ $store.state.users && $store.state.users.profile && $store.state.users.profile.nationality }}
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              {{ $t('label.identityNumber') }}
            </div>
            <div class="col-6">
              {{ $store.state.users && $store.state.users.profile && $store.state.users.profile.identityNumber }}
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              {{ $t('label.name') }}
            </div>
            <div class="col-6">
              {{ $store.state.users && $store.state.users.profile && $store.state.users.profile.name }}
            </div>
          </div>

        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
