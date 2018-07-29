<template>
  <q-page padding>
    <div>
      <q-card>
        <q-card-title>
          <q-icon name="star" color="primary" /> {{ $t('label.yourProfile') }}
          <div slot="subtitle" class="row column gutter-y-sm" v-if="!hasProfile">
            <q-alert
              type="warning"
              icon="warning"
            >
              {{ $t('warning.warningSubmitOne') }}
            </q-alert>
            <q-alert
                type="warning"
                icon="warning"
              >
              {{ $t('warning.warningSameAsId') }}
            </q-alert>
            <q-alert
                type="warning"
                icon="warning"
              >
              {{ $t('warning.warningGettingAccount') }}
            </q-alert>
          </div>
          <div slot="subtitle" class="row column gutter-y-sm" v-else>
            <q-alert
                type="info"
                icon="info"
              >
              {{ $t('message.changeAccount') }}
            </q-alert>
          </div>
        </q-card-title>
        <q-card-separator />
        <q-card-main class="row gutter-y-md gutter-x-lg">
          <q-field
            icon="person"
            class="col-md-6"
            :error="$v.name.$error"
          >
            <q-input
              v-model="name"
              :placeholder="$t('label.name')"
              :readonly="hasProfile && !!name"
            />
          </q-field>

          <q-field
            icon="picture_in_picture"
            class="col-md-6"
            :error="$v.identityNumber.$error"
          >
            <q-input
              v-model="identityNumber"
              :placeholder="$t('label.identityNumber')"
              :readonly="hasProfile && !!identityNumber"
            />
          </q-field>

          <q-field
            icon="date_range"
            class="col-md-6"
            :error="$v.dob.$error"
          >
            <q-datetime
              v-model="dob"
              min="1940-01-01"
              max="2010-12-31"
              :placeholder="$t('label.dateOfBirth')"
              :readonly="hasProfile && !!dob"
            />
          </q-field>

          <q-field
            icon="phone_iphone"
            class="col-md-6"
            :error="$v.phone.$error"
          >
            <q-input
              v-model="phone"
              :placeholder="$t('label.cellPhoneNumber')"
              :readonly="hasProfile && !!phone"
              type="number"
            />
          </q-field>

          <q-field
            icon="email"
            class="col-12"
            :error="$v.email.$error"
          >
            <q-input
              readonly
              v-model="email"
              :placeholder="$t('label.email')"
              type="email"
            />
          </q-field>

          <q-field
            icon="home"
            class="col-12"
            :error="$v.address.$error"
          >
            <q-input
              v-model="address"
              :placeholder="$t('label.address')"
              :readonly="hasProfile && !!address"
            />
          </q-field>
          <div class="col-12" v-if="!hasProfile" >
            <q-btn
              :label="$t('label.submit')"
              :loading="isLoading"
              @click="submit"
            />
          </div>
        </q-card-main>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { required, email, minLength, numeric } from 'vuelidate/lib/validators';
import { date } from 'quasar';
import { handleSubmitAccount } from '../services/account';

export default {
  name: 'Profile',
  data () {
    let profile = this.$store.state.users.profile;
    let hasProfile = profile && Object.keys(profile).length > 0;

    return {
      hasProfile: hasProfile,
      name: hasProfile ? profile.name : '',
      identityNumber: hasProfile ? profile.id : '',
      dob: hasProfile ? profile.dob : '',
      phone: hasProfile ? profile.phone : '',
      email: this.$firebase.auth().currentUser.email,
      address: hasProfile ? profile.address : '',
      isLoading: false
    };
  },
  methods: {
    submit () {
      this.$v.$touch();
      let profile = {
        name: this.name,
        id: this.identityNumber,
        dob: date.formatDate(this.dob, 'YYYY-MM-DD'),
        phone: this.phone,
        email: this.email,
        address: this.address
      };

      if (this.$v.$invalid) {
        return;
      }

      if (profile && profile.name && profile.id && profile.dob && profile.phone && profile.email && profile.address) {
        handleSubmitAccount(this.$store, profile, this.$router).then(() => {
          this.isLoading = false;
        });

        this.isLoading = true;
      }
    }
  },
  validations: {
    name: {
      required
    },
    identityNumber: {
      required,
      minLength: minLength(9)
    },
    dob: {
      required
    },
    phone: {
      required,
      numeric
    },
    email: {
      required,
      email
    },
    address: {
      required
    }
  }
};
</script>

<style scoped>

</style>
