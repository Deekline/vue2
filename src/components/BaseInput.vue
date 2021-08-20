<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      @input="updateValue"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
    },
  },
};
</script>

<style scoped></style>
