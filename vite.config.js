import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './lib/src/index.js', // 你封装的组件入口
      name: 'ElementSelect', // 库名称
      fileName: 'element-select', // 输出的文件名称
    },
    rollupOptions: {
      // 指定外部依赖，防止打包进库中
      external: ['vue', 'element-ui'],
      output: {
        // 为 UMD 构建模式下提供全局变量名称
        globals: {
          vue: 'Vue',
          'element-ui': 'ELEMENT', // element-ui 在 UMD 模式下的全局变量名
        },
      },
    },
  },
});
