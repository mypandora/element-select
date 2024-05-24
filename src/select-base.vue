<template>
  <div>
    <h1>基础</h1>

    <my-select
      v-model="value"
      collapseTags
      placeholder="Select an option"
      valueKey="level"
      :formatter="handleFormatter"
    >
      <my-option
        v-for="item in levels"
        :key="item.label"
        :optionItem="item"
        optionItemName="name22"
        radioGroupKey="groups"
        radioKey="label"
        radioValue="value"
      ></my-option>
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
      levels: [
        {
          level: 1,
          name22: '国家',
          groups,
        },
        {
          level: 2,
          name22: '省',
          groups,
        },
        {
          level: 3,
          name22: '市',
          groups,
        },
        {
          level: 4,
          name22: '县/区',
          groups,
        },
        {
          level: 5,
          name22: '乡/镇',
          groups,
        },
        {
          level: 6,
          name22: '村',
          groups,
        },
      ],
    };
  },
  methods: {
    handleFormatter(item) {
      return item.name22 + 123;
    },
  },
};
</script>
