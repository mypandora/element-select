<template>
  <div>
    <h1>禁用</h1>

    <my-select v-model="value" collapseTags placeholder="Select an option" valueKey="level" disabled>
      <my-option v-for="item in levels" :key="item.label" :optionItem="item"> </my-option>
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
};
</script>
