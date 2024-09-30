<template>
  <div
    class="el-select"
    :class="[selectSize ? 'el-select--' + selectSize : '']"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose"
  >
    <div class="el-select__tags" ref="tags" :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }">
      <span v-if="collapseTags && selected.length">
        <el-tag
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="selected[0].hitState"
          type="info"
          @close="deleteTag($event, selected[0])"
          disable-transitions
        >
          <span class="el-select__tags-text">{{ selected[0].currentLabel }}</span>
        </el-tag>
        <el-tag v-if="selected.length > 1" :closable="false" :size="collapseTagSize" type="info" disable-transitions>
          <span class="el-select__tags-text">+ {{ selected.length - 1 }}</span>
        </el-tag>
      </span>
      <transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
        <el-tag
          v-for="item in selected"
          :key="getValueKey(item)"
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="item.hitState"
          type="info"
          @close="deleteTag($event, item)"
          disable-transitions
        >
          <span class="el-select__tags-text">{{ item.currentLabel }}</span>
        </el-tag>
      </transition-group>
    </div>
    <el-input
      ref="reference"
      type="text"
      :placeholder="currentPlaceholder"
      :size="selectSize"
      :disabled="selectDisabled"
      :readonly="true"
      :validate-event="false"
      :class="{ 'is-focus': visible }"
      :tabindex="null"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
    >
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <i v-show="!showClose" :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
        <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close" @click="handleClearClick"></i>
      </template>
    </el-input>
    <transition name="el-zoom-in-top" @after-leave="doDestroy">
      <el-select-menu ref="popper" :append-to-body="popperAppendToBody" v-show="visible && emptyText !== false">
        <el-scrollbar
          tag="ul"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          ref="scrollbar"
          v-show="options.length > 0"
        >
          <slot></slot>
        </el-scrollbar>
        <template v-if="emptyText">
          <slot name="empty" v-if="$slots.empty"></slot>
          <p class="el-select-dropdown__empty" v-else>
            {{ emptyText }}
          </p>
        </template>
      </el-select-menu>
    </transition>
  </div>
</template>

<script>
import Emitter from 'element-ui/src/mixins/emitter';
import Focus from 'element-ui/src/mixins/focus';
import ElSelectMenu from './select-dropdown.vue';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
import { getValueByPath, valueEquals } from 'element-ui/src/utils/util';

export default {
  mixins: [Emitter, Focus('reference')],

  name: 'ElSelect',

  componentName: 'ElSelect',

  inject: {
    elForm: {
      default: '',
    },

    elFormItem: {
      default: '',
    },
  },

  provide() {
    return {
      select: this,
    };
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },

    showClose() {
      const hasValue = Array.isArray(this.value) && this.value.length > 0;
      const criteria = this.clearable && !this.selectDisabled && this.inputHovering && hasValue;
      return criteria;
    },

    iconClass() {
      return this.visible ? 'arrow-up is-reverse' : 'arrow-up';
    },

    emptyText() {
      if (this.options.length === 0) {
        return '无数据';
      }
      return null;
    },

    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },

    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },

    collapseTagSize() {
      return ['small', 'mini'].indexOf(this.selectSize) > -1 ? 'mini' : 'small';
    },

    propPlaceholder() {
      return typeof this.placeholder !== 'undefined' ? this.placeholder : '请选择';
    },
  },

  components: {
    ElSelectMenu,
  },

  directives: { Clickoutside },

  props: {
    value: {
      required: true,
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    popperClass: String,
    placeholder: {
      type: String,
      required: false,
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
    formatter: Function,
  },

  data() {
    return {
      options: [],
      cachedOptions: [],
      selected: [],
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      visible: false,
      softFocus: false,
      inputHovering: false,
      currentPlaceholder: '',
      isSilentBlur: false,
    };
  },

  watch: {
    selectDisabled() {
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },

    propPlaceholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },

    value(val, oldVal) {
      this.resetInputHeight();
      if (val && val.length > 0) {
        this.currentPlaceholder = '';
      } else {
        this.currentPlaceholder = this.cachedPlaceHolder;
      }
      this.setSelected();
      if (!valueEquals(val, oldVal)) {
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
    },

    visible(val) {
      if (!val) {
        this.broadcast('ElSelectDropdown', 'destroyPopper');
        this.inputLength = 20;
      } else {
        this.broadcast('ElSelectDropdown', 'updatePopper');
      }
      this.$emit('visible-change', val);
    },

    options() {
      if (this.$isServer) return;
      this.$nextTick(() => {
        this.broadcast('ElSelectDropdown', 'updatePopper');
      });
      this.resetInputHeight();
      const inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected();
      }
    },
  },

  methods: {
    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit('change', val);
      }
    },

    getOption(value) {
      let option;
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      const isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]';
      const isUndefined = Object.prototype.toString.call(value).toLowerCase() === '[object undefined]';

      for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
        const cachedOption = this.cachedOptions[i];
        const isEqual = isObject
          ? getValueByPath(cachedOption.value, this.valueKey) === getValueByPath(value, this.valueKey)
          : cachedOption.value === value;
        if (isEqual) {
          option = cachedOption;
          break;
        }
      }
      if (option) return option;
      const label = !isObject && !isNull && !isUndefined ? String(value) : '';
      const newOption = {
        value,
        currentLabel: label,
      };
      newOption.hitState = false;
      return newOption;
    },

    setSelected() {
      const result = [];
      if (Array.isArray(this.value)) {
        this.value.forEach((value) => {
          result.push(this.getOption(value));
        });
      }
      this.selected = result;
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },

    handleFocus(event) {
      if (!this.softFocus) {
        if (this.automaticDropdown) {
          this.visible = true;
        }
        this.$emit('focus', event);
      } else {
        this.softFocus = false;
      }
    },

    blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },

    handleBlur(event) {
      setTimeout(() => {
        if (this.isSilentBlur) {
          this.isSilentBlur = false;
        } else {
          this.$emit('blur', event);
        }
      }, 50);
      this.softFocus = false;
    },

    handleClearClick(event) {
      this.deleteSelected(event);
    },

    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },

    handleClose() {
      this.visible = false;
    },

    resetInputHeight() {
      if (this.collapseTags) return;
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        const inputChildNodes = this.$refs.reference.$el.childNodes;
        const input = [].filter.call(inputChildNodes, (item) => item.tagName === 'INPUT')[0];
        const tags = this.$refs.tags;
        const tagsHeight = tags ? Math.round(tags.getBoundingClientRect().height) : 0;
        const sizeInMap = this.initialInputHeight || 40;
        input.style.height =
          this.selected.length === 0
            ? sizeInMap + 'px'
            : Math.max(tags ? tagsHeight + (tagsHeight > sizeInMap ? 6 : 0) : 0, sizeInMap) + 'px';
        if (this.visible && this.emptyText !== false) {
          this.broadcast('ElSelectDropdown', 'updatePopper');
        }
      });
    },

    handleOptionSelect(option, byClick) {
      const value = (this.value || []).slice();
      const optionIndex = this.getValueIndex(value, option.value);
      if (optionIndex > -1) {
        value.splice(optionIndex, 1, option.value);
      } else {
        value.push(option.value);
      }
      this.$emit('input', value);
      this.emitChange(value);
      this.isSilentBlur = byClick;
      this.setSoftFocus();
    },

    setSoftFocus() {
      this.softFocus = true;
      const input = this.$refs.reference;
      if (input) {
        input.focus();
      }
    },

    getValueIndex(arr = [], value) {
      const valueKey = this.valueKey;
      let index = -1;
      arr.some((item, i) => {
        if (getValueByPath(item, valueKey) === getValueByPath(value, valueKey)) {
          index = i;
          return true;
        }
        return false;
      });
      return index;
    },

    toggleMenu() {
      if (!this.selectDisabled) {
        this.visible = !this.visible;
        if (this.visible) {
          this.$refs.reference.focus();
        }
      }
    },

    deleteSelected(event) {
      event.stopPropagation();
      const value = [];
      this.$emit('input', value);
      this.emitChange(value);
      this.visible = false;
      this.$emit('clear');
    },

    deleteTag(event, tag) {
      const index = this.selected.indexOf(tag);
      if (index > -1 && !this.selectDisabled) {
        const value = this.value.slice();
        value.splice(index, 1);
        this.$emit('input', value);
        this.emitChange(value);
        this.$emit('remove-tag', tag.value);
      }
      event.stopPropagation();
    },

    onOptionDestroy(index) {
      if (index > -1) {
        this.optionsCount--;
        this.options.splice(index, 1);
      }
    },

    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },

    handleResize() {
      this.resetInputWidth();
      this.resetInputHeight();
    },

    getValueKey(item) {
      if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
        return item.value;
      } else {
        return getValueByPath(item.value, this.valueKey);
      }
    },
  },

  created() {
    this.cachedPlaceHolder = this.currentPlaceholder = this.propPlaceholder;
    if (!Array.isArray(this.value)) {
      this.$emit('input', []);
    }

    this.$on('handleOptionClick', this.handleOptionSelect);
    this.$on('setSelected', this.setSelected);
  },

  mounted() {
    if (Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = '';
    }
    addResizeListener(this.$el, this.handleResize);

    const reference = this.$refs.reference;
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28,
      };
      const input = reference.$el.querySelector('input');
      this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.selectSize];
    }
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
    this.setSelected();
  },

  beforeDestroy() {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
  },
};
</script>
