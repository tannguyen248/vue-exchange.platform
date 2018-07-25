<template>
  <q-page padding>
    <div>
      <q-card>
        <q-card-title>
          <q-icon name="star" color="primary" /> Your Profile
          <div slot="subtitle" class="row column gutter-y-sm" v-if="!hasProfile">
            <q-alert
              type="warning"
              icon="warning"
            >
              You can only submit 1 time.
            </q-alert>
            <q-alert
                type="warning"
                icon="warning"
              >
              You must fill all infomation as you ID card.
            </q-alert>
            <q-alert
                type="warning"
                icon="warning"
              >
              This information use to verify you own this account
            </q-alert>
          </div>
          <div slot="subtitle" class="row column gutter-y-sm" v-else>
            <q-alert
                type="warning"
                icon="warning"
              >
              You can contact us to change profile
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
              placeholder="Name"
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
              placeholder="Identity number"
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
              placeholder="Date of birth"
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
              placeholder="Cell phone"
              :readonly="hasProfile && !!phone"
            />
          </q-field>

          <q-field
            icon="email"
            class="col-12"
            :error="$v.email.$error"
          >
            <q-input
              v-model="email"
              placeholder="Email"
              :readonly="hasProfile && !!email"
            />
          </q-field>

          <q-field
            icon="home"
            class="col-12"
            :error="$v.address.$error"
          >
            <q-input
              v-model="address"
              placeholder="123 Street name, ward 13, district 10"
              :readonly="hasProfile && !!address"
            />
          </q-field>
          <div class="col-12" v-if="!hasProfile" >
            <q-btn label="Submit" @click="submit" />
          </div>
        </q-card-main>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import { date } from 'quasar';
import { handleSubmitAccount } from '../services/account';

export default {
  name: 'Profile',
  data () {
    let profile = this.$store.state.user.profile;
    let hasProfile = profile && Object.keys(profile).length > 0;
    console.log(hasProfile);
    return {
      hasProfile: hasProfile,
      name: hasProfile ? this.$store.state.user.profile.name : '',
      identityNumber: hasProfile ? this.$store.state.user.profile.id : '',
      dob: hasProfile ? this.$store.state.user.profile.dob : '',
      phone: hasProfile ? this.$store.state.user.profile.phone : '',
      email: hasProfile ? this.$store.state.user.profile.email : '',
      address: hasProfile ? this.$store.state.user.profile.address : ''
    };
  },
  methods: {
    submit () {
      this.$v.$touch();
      let form = {
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

      handleSubmitAccount(this.$store, form);
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
      required
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
