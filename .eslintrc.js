// eslint-disable-next-line no-undef
module.exports = {
  env: {
    'vue/setup-compiler-macros': true,
  },
  plugins: [],
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    // Enable vue/script-setup-uses-vars rule
    'vue/script-setup-uses-vars': 'error',
    'vue/no-lone-template': 0,
  },
}
