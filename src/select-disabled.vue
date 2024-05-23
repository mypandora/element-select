<template>
  <div>
    <h1>禁用</h1>

    <my-select v-model="value" collapseTags placeholder="Select an option" valueKey="level" disabled>
      <my-option v-for="item in levels" :key="item.name" :optionItem="item"> </my-option>
    </my-select>
  </div>
</template>

<script>
const STATUS = [
  { name: '全部', code: 10 },
  { name: '优秀', code: 1 },
  { name: '良好', code: 0 },
  { name: '一般', code: -1 },
  { name: '差', code: -2 },
];

export default {
  data() {
    return {
      value: null,
      levels: [
        {
          level: 1,
          name: '国家',
          status: STATUS,
        },
        {
          level: 2,
          name: '省',
          status: STATUS,
        },
        {
          level: 3,
          name: '市',
          status: STATUS,
        },
        {
          level: 4,
          name: '县/区',
          status: STATUS,
        },
        {
          level: 5,
          name: '乡/镇',
          status: STATUS,
        },
        {
          level: 6,
          name: '村',
          status: STATUS,
        },
      ],
    };
  },
};
</script>
