<template>
  <div>
    <select-base></select-base>
    <select-clear></select-clear>
    <select-disabled></select-disabled>
    <select-disabled-item></select-disabled-item>
  </div>
</template>

<script>
import SelectBase from './select-base.vue';
import SelectClear from './select-clear.vue';
import SelectDisabled from './select-disabled.vue';
import SelectDisabledItem from './select-disabled-item.vue';

export default {
  name: 'App',
  components: {
    SelectBase,
    SelectClear,
    SelectDisabled,
    SelectDisabledItem,
  },
  data() {
    return {};
  },
};
</script>
