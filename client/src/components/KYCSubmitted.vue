<template>
  <div class="fixed fixed-center">
    <q-card>
      <q-card-title>
        <p class="q-headline">
          <q-icon name="check_circle" color="positive" /> {{ $t('content.kycSubmittedTitle') }}
        </p>
      </q-card-title>
      <q-card-main>
        <p class="q-title">{{ $t('content.kycSubmittedBody') }}</p>
      </q-card-main>
    </q-card>

  </div>
</template>

<script>
export default {
  name: 'KYCSubmitted'
};
</script>
