// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true, // 添加所有 ECMAScript 2021 全局变量并自动将 ecmaVersion 解析器选项设置为 12
    node: true,
    'vue/setup-compiler-macros': true,
  },
  plugins: ['@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'lasted',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['prettier', 'eslint:recommended', 'plugin:vue/vue3-recommended'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    // Enable vue/script-setup-uses-vars rule
    'vue/script-setup-uses-vars': 'error',
    'vue/no-lone-template': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/valid-attribute-name': 0,
  },
}
