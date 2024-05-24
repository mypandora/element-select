## 依赖

Vue 2.6.14+

Element-UI 2.15.8+

## 安装

```bash
npm install @mypandora/element-select
```

## Select 选择器

展开下拉框，使用多个单选按钮组进行选择。

### 基础用法

适用广泛的基础单选
:::demo `v-model`的值为当前被选中的`my-option`的 value 属性值

```html

<template>
  <my-select v-model="value" collapseTags placeholder="Select an option" valueKey="level">
    <my-option v-for="item in levels" :key="item.label" :optionItem="item"></my-option>
  </my-select>
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
    }
  }
</script>
```

:::

### 有禁用选项

:::demo 在`my-option`中，设定`disabled`值为 true，即可禁用该选项

```html

<template>
  <my-select v-model="value" collapseTags placeholder="Select an option" valueKey="level">
    <my-option v-for="item in levels" :key="item.label" :optionItem="item"
               :disabled="item.disabled"></my-option>
  </my-select>
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
            disabled: true,
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
      }
    }
  }
</script>
```

:::

### 禁用状态

选择器不可用状态

:::demo 为`my-select`设置`disabled`属性，则整个选择器不可用

```html

<template>
  <my-select v-model="value" collapseTags placeholder="Select an option" valueKey="level" disabled>
    <my-option v-for="item in levels" :key="item.label" :optionItem="item"></my-option>
  </my-select>
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
      }
    }
  }
</script>
```

:::

### 可清空单选

包含清空按钮，可将选择器清空为初始状态

:::demo 为`my-select`设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。

```html

<template>
  <my-select v-model="value" collapseTags clearable placeholder="Select an option" valueKey="level">
    <my-option v-for="item in levels" :key="item.label" :optionItem="item"></my-option>
  </my-select>
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
      }
    }
  }
</script>
```

### Select Attributes

| 参数                    | 说明                                            | 类型                        | 可选值               | 默认值   |
|-----------------------|-----------------------------------------------|---------------------------|-------------------|-------|
| value / v-model       | 绑定值                                           | boolean / string / number | —                 | —     |
| disabled              | 是否禁用                                          | boolean                   | —                 | false |
| value-key             | 作为 value 唯一标识的键名，绑定值为对象类型时必填                  | string                    | —                 | value |
| size                  | 输入框尺寸                                         | string                    | medium/small/mini | —     |
| clearable             | 是否可以清空选项                                      | boolean                   | —                 | false |
| collapse-tags         | 多选时是否将选中值按文字的形式展示                             | boolean                   | —                 | false |
| name                  | select input 的 name 属性                        | string                    | —                 | —     |
| placeholder           | 占位符                                           | string                    | —                 | 请选择   |
| popper-class          | Select 下拉框的类名                                 | string                    | —                 | —     |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean                   | -                 | true  |
| automatic-dropdown    | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单            | boolean                   | -                 | false |
| formatter    | 格式化 tag 显示的内容            | function                   | -                 | - |

### Select Events

| 事件名称           | 说明                   | 回调参数                 |
|----------------|----------------------|----------------------|
| change         | 选中值发生变化时触发           | 目前的选中值               |
| visible-change | 下拉框出现/隐藏时触发          | 出现则为 true，隐藏则为 false |
| remove-tag     | 多选模式下移除tag时触发        | 移除的tag值              |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                    |
| blur           | 当 input 失去焦点时触发      | (event: Event)       |
| focus          | 当 input 获得焦点时触发      | (event: Event)       |

### Select Slots

| name   | 说明            |
|--------|---------------|
| —      | Option 组件列表   |
| prefix | Select 组件头部内容 |
| empty  | 无选项时的列表       |

### Option Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| optionItem | 选项数据 | object | — | — |
| optionItemName | 选项的名称 | string | — | name |
| radioGroupKey | 选项中单选按钮组的属性 | string | — | groups |
| radioValue | 单选按钮的值属性 | string | — | value |
| radioKey | 单选按钮的名称属性 | string | — | label |
| disabled | 是否禁用该选项 | boolean | — | false |

### Methods

| 方法名   | 说明                  | 参数 |
|-------|---------------------|----|
| focus | 使 input 获取焦点        | -  |
| blur  | 使 input 失去焦点，并隐藏下拉框 | -  |
