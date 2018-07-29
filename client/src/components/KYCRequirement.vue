<template>
  <q-card>
    <q-card-title class="text-primary">
      <q-icon name="info" color="primary" /> {{ $t('label.IdCardRequirement') }}
    </q-card-title>
    <q-card-main>
      <div class="q-subheading">
        <q-icon name="check" color="positive" /> {{ $t('content.kycIdInfomationTitle') }}
      </div>
      <div>
        <p class="q-subheading">
          <q-icon name="warning" color="warning" /> {{ $t('content.kycIdInfomationSubTitle') }}
        </p>
        <div class="q-ml-lg">
          <div class="quote">
            <div class="q-body-2">
              <q-icon name="donut_small" color="primary" /> {{ $t('content.kycIdInfomation1') }}
            </div>
            <div class="q-body-2">
              <q-icon name="donut_small" color="primary" /> {{ $t('content.kycIdInfomation2') }}
            </div>
            <div class="q-body-2">
              <q-icon name="donut_small" color="primary" /> {{ $t('content.kycIdInfomation3') }}
            </div>
          </div>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
export default {

};
</script>

<style scoped>

</style>
