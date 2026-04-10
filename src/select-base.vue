<template>
  <div>
    <h1>基础</h1>

    <my-select
      v-model="value"
      collapseTags
      valueKey="level"
      radioValueKey="groups"
      :radioProps="{ label: 'label', value: 'value' }"
    >
      <my-option
        v-for="item in options"
        :key="item.label"
        :optionItem="item"
        optionItemName="name"
        radioGroupKey="groups"
        radioKey="label"
        radioValue="value"
      >
        <template #default="{ optionItem, radio, updateValue }">
          <div style="display: flex; justify-content: space-between; align-items: center">
            <label>{{ optionItem.name }}</label>
            <el-radio-group :value="radio" @input="(value) => updateValue(value)" :disabled="optionItem.disabled">
              <el-radio v-for="item in optionItem.groups" :key="item.label" :label="item.value">
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </div>
        </template>
      </my-option>
    </my-select>
  </div>
</template>

<script>
const groups = [
  { label: '全部', value: 10 },
  { label: '优秀', value: 1 },
  { label: '良好', value: 0 },
  { label: '一般', value: -1 },
  { label: '差', value: -2 },
];

export default {
  data() {
    return {
      value: null,
      options: [
        {
          level: 1,
          name: '国家',
          groups,
        },
        {
          level: 2,
          name: '省',
          groups,
        },
        {
          level: 3,
          name: '市',
          groups,
        },
        {
          level: 4,
          name: '县/区',
          groups,
        },
        {
          level: 5,
          name: '乡/镇',
          groups,
        },
        {
          level: 6,
          name: '村',
          groups,
        },
      ],
    };
  },
  methods: {
    handleFormatter(item) {
      return item.name + 123;
    },
  },
};
</script>
