<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      @change="updateValue"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    >
      <option
        v-for="option in options"
        :value="option"
        :key="option.id"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true,
    },
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
