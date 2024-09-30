<template>
  <li
    class="el-select-dropdown__item"
    v-show="visible"
    :class="{
      selected: itemSelected,
      'is-disabled': disabled,
      hover: hover,
    }"
  >
    <slot>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <label>{{ optionItem[optionItemName] }}</label>
        <el-radio-group v-model="radio" :disabled="optionItem.disabled">
          <el-radio v-for="item in optionItem[radioGroupKey]" :key="item[radioKey]" :label="item[radioValue]">
            {{ item[radioKey] }}
          </el-radio>
        </el-radio-group>
      </div>
    </slot>
  </li>
</template>

<script>
import Emitter from 'element-ui/src/mixins/emitter';
import { getValueByPath } from 'element-ui/src/utils/util';

export default {
  mixins: [Emitter],

  name: 'ElOption',

  componentName: 'ElOption',

  inject: ['select'],

  props: {
    optionItem: {
      type: Object,
      default: () => ({}),
    },
    optionItemName: {
      type: String,
      default: 'name',
    },
    radioGroupKey: {
      type: String,
      default: 'groups',
    },
    radioKey: {
      type: String,
      default: 'label',
    },
    radioValue: {
      type: String,
      default: 'value',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      index: -1,
      visible: true,

      hitState: false,
      hover: false,
      radio: undefined,
    };
  },

  computed: {
    currentLabel() {
      if (this.select.formatter) {
        return this.select.formatter(this.optionItem);
      }
      const level = getValueByPath(this.optionItem, this.optionItemName);
      const status = getValueByPath(this.optionItem, this.radioGroupKey).find(
        (item) => item[this.radioValue] === this.radio,
      )?.[this.radioKey];
      return `${level}-${status}`;
    },
    itemSelected() {
      return this.contains(this.select.value, this.value);
    },
    level() {
      return this.optionItem[this.select.valueKey];
    },
    value() {
      const radio = this.radio;
      if (radio != null) {
        return { [this.select.valueKey]: this.level, [this.radioGroupKey]: radio };
      }
      return null;
    },
  },

  watch: {
    itemSelected(val) {
      if (!val) {
        this.radio = undefined;
      }
    },
    currentLabel() {
      this.dispatch('ElSelect', 'setSelected');
    },
    value(val) {
      if (val == null) {
        return;
      }
      this.selectOptionClick();
      this.dispatch('ElSelect', 'setSelected');
    },
  },

  methods: {
    contains(arr = [], target) {
      const valueKey = this.select.valueKey;
      return (
        arr &&
        arr.some((item) => {
          return getValueByPath(item, valueKey) === getValueByPath(target, valueKey);
        })
      );
    },

    selectOptionClick() {
      if (this.disabled !== true) {
        this.dispatch('ElSelect', 'handleOptionClick', [this, true]);
      }
    },
  },

  created() {
    this.select.options.push(this);
    this.select.cachedOptions.push(this);
    this.select.optionsCount++;
  },

  beforeDestroy() {
    const { selected } = this.select;
    const selectedOptions = selected;
    const index = this.select.cachedOptions.indexOf(this);
    const selectedIndex = selectedOptions.indexOf(this);

    // if option is not selected, remove it from cache
    if (index > -1 && selectedIndex < 0) {
      this.select.cachedOptions.splice(index, 1);
    }
    this.select.onOptionDestroy(this.select.options.indexOf(this));
  },
};
</script>
