<template>
  <q-page padding>
    <div v-if="isSubmitted">
      <KYCSubmitted />
    </div>
    <div v-else-if="isVerifed">
      <KYCVerified />
    </div>
    <div class="kyc-container" v-else>
      <KYCRequirement />
      <q-stepper color="primary" ref="stepper" alternative-labels>
        <q-step default name="first" :title="$t('label.frontIdCard')">
          <div class="row items-center justify-center">
            <KYCExample
              :label="$t('label.frontIdCard')"
              imageSource="https://bitmoon.net/assets/global/img/bitmoon/IdentityCard_Front.jpg" />
            <Uploader
              :label="$t('label.frontIdCard')"
              key="frontIdCard"
              class="q-ma-sm"
              v-model="frontIdCard"
            />
          </div>

          <!-- Navigation for this step at the end of QStep-->
          <q-stepper-navigation class="justify-end">
            <q-btn
              :disabled="!frontIdCard"
              :label="$t('label.next')"
              @click="$refs.stepper.next()"
              color="primary"
              icon-right="arrow_forward_ios"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step name="second" :title="$t('label.backIdCard')">
          <div class="row items-center justify-center">
            <KYCExample
              :label="$t('label.backIdCard')"
              v-model="backIdCard"
              imageSource="https://bitmoon.net/assets/global/img/bitmoon/IdentityCard_Back.jpg" />
            <Uploader
              :label="$t('label.backIdCard')"
              key="backIdCard"
              class="q-ma-sm"
              v-model="backIdCard"
             />
          </div>

          <q-stepper-navigation class="justify-end">
            <q-btn
              flat
              :label="$t('label.back')"
              @click="$refs.stepper.previous()"
              color="primary"
              icon="arrow_back_ios"
            />
            <q-btn
              :label="$t('label.next')"
              :disabled="!backIdCard"
              @click="$refs.stepper.next()"
              color="primary"
              icon-right="arrow_forward_ios"
            />
          </q-stepper-navigation>
        </q-step>
        <q-step name="third" :title="$t('label.personIdCard')">
          <div class="row items-center justify-center">
            <KYCExample
              :label="$t('label.personIdCard')"
              v-model="personWithIdCard"
              imageSource="https://bitmoon.net/assets/global/img/bitmoon/selfie-bitmoon.png" />
            <Uploader
              :label="$t('label.personIdCard')"
              key="personIdCard"
              class="q-ma-sm"
              v-model="personWithIdCard"
            />
          </div>

          <q-stepper-navigation class="justify-end">
            <q-btn
              flat
              :loading="isLoading"
              :label="$t('label.back')"
              @click="$refs.stepper.previous()"
              color="primary"
              icon="arrow_back_ios"
            />
            <q-btn
              :loading="isLoading"
              :disabled="!frontIdCard || !backIdCard || !personWithIdCard"
              :label="$t('label.update')"
              @click="upload"
              color="primary"
              icon-right="cloud_upload"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
  </q-page>
</template>

<script>
import Uploader from '../components/Uploader';
import KYCExample from '../components/KYCExample';
import KYCRequirement from '../components/KYCRequirement';
import KYCSubmitted from '../components/KYCSubmitted';
import KYCVerified from '../components/KYCVerified';
import { saveImage, changeVerificationStatus } from '../services/firebase';
import { VerificationStatus } from '../utils/const';

export default {
  name: 'KYC',
  components: {
    Uploader,
    KYCExample,
    KYCRequirement,
    KYCSubmitted,
    KYCVerified
  },
  data () {
    return {
      frontIdCard: '',
      backIdCard: '',
      personWithIdCard: '',
      isLoading: false
    };
  },
  computed: {
    isSubmitted () {
      return this.$store.state.users.verificationStatus === VerificationStatus.submitted;
    },
    isVerifed () {
      return this.$store.state.users.verificationStatus === VerificationStatus.verified;
    }
  },
  methods: {
    validateInput () {
      if (!this.frontIdCard || !this.backIdCard || !this.personWithIdCard ||
        typeof this.frontIdCard !== 'object' ||
        typeof this.backIdCard !== 'object' ||
        typeof this.personWithIdCard !== 'object') {
        return false;
      }

      return true;
    },
    upload () {
      if (this.validateInput()) {
        this.isLoading = true;
        Promise.all([saveImage(this.frontIdCard, 'frontIdCard.jpg'), saveImage(this.backIdCard, 'backIdCard.jpg'), saveImage(this.personWithIdCard, 'personWithIdCard.jpg')])
          .then(values => {
            this.isLoading = false;
            changeVerificationStatus(VerificationStatus.submitted, this.$store);

            this.$q.notify({
              message: this.$t('message.verificationSubmit'),
              position: 'top',
              type: 'positive'
            });
          }).catch(() => {
            this.$q.notify({
              message: this.$t('message.verificationSubmitError'),
              position: 'top'
            });
          });
      } else {
        this.$q.notify({
          message: this.$t('message.verificationMissing'),
          position: 'top'
        });
      }
    }
  }
};
</script>
