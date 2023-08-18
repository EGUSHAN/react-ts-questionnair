module.exports = {
  root: true, // 指定了root为true，eslint只检查当前项目目录
  env: {
    // 提供预设的全局变量，避免eslint检查报错，例如window
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    // 共享推荐的配置风格
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser', // 由于eslint默认使用espree来作为js的解释器，我们项目使用的是ts，所以换成了这个
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest', // 指定ECMAScript 语法为最新
    sourceType: 'module', // 指定代码为 ECMAScript 模块
    ecmaFeatures: {
      jsx: true, // 启用jsx
    },
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // React17后不需要在jsx中主动引入react
    'prettier/prettier': [
      'error',
      {
        singleAttributePerLine: false, // 不强制要求一个属性占一行
      },
    ],
  },
};
