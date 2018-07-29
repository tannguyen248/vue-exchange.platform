<template>
  <q-card flat>
      <q-card-title>
        {{ label }}:
      </q-card-title>
      <q-card-main>
        <div class="input_file_box view">
          <input
            required
            type="file"
            name="photo"
            id="update_file"
            accept="image/*"
            :files="files"
            @change.prevent="handleImageChange"
          >
          <div class="add_btn">
            <span>
              <q-icon name="add_circle" /> {{ label }}
            </span>
          </div>
          <div class="preview" id="update_preview" :style="previewStyle">
          </div>
          <div class="loading">
            <img src="https://www.huobi.com/image/loading.79549a7.svg">
          </div>
        </div>
      </q-card-main>
    </q-card>
</template>

<script>
import { isValidFileSize, isImage } from '../utils/helpers';

export default {
  model: {
    prop: 'files',
    event: 'change'
  },
  props: [
    'label',
    'files'
  ],
  data () {
    return {
      previewStyle: '',
      isUploaded: false
    };
  },
  methods: {
    notify (message) {
      this.$q.notify({
        message: message,
        position: 'top'
      });
    },

    validateImage (image) {
      if (!image.type.match('image.*')) {
        this.notify(this.$t('message.onlyShareImage'));

        return false;
      }

      if (!isValidFileSize(image)) {
        this.notify(this.$t('message.limitedImageSize'));

        return false;
      }

      if (!isImage(image.name)) {
        this.notify(this.$t('message.onlyShareImage'));

        return false;
      }

      return true;
    },

    handleImageChange (event) {
      let file = event.target.files[0];
      if (file) {
        let isValidated = this.validateImage(file);
        if (isValidated) {
          this.previewStyle = `display: block; background-image: url("${URL.createObjectURL(file)}");`;
          this.$emit('change', file);
        } else {
          this.$emit('change', '');
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.input_file_box {
  border-color: #4e5b85;
  background-color: #1e2235;
  position: relative;
  height: 200px;
  border: 1px solid;
  border-radius: 5px;

  input {
    position: absolute;
    z-index: 4;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    outline: 0;
    margin: 0;
    padding: 0;
  }
}

.input_file_box .add_btn {
  color: #7a98f7;
  position: absolute;
  left: 0;
  width: 100%;
  top: 50%;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  transform : translateY(-50%);
}

.input_file_box .edit_btn {
  position: absolute;
  left: 0;
  width: 100%;
  top: 50%;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  transform : translateY(-50%);
  z-index: 5;
}

.input_file_box .preview {
  position: relative;
  display: none;
  height: 100%;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: contain;
}

.input_file_box .loading {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 5;
  display: none;
  width: 100%;
  line-height: 250px;
  text-align: center;
  background-color: #262a42;
}
</style>
