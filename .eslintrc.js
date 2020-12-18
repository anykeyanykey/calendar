module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  rules: {
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'no-unused-vars': 'off',
    'no-debugger': 'off',
    'vue/no-unused-components': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'no-useless-escape': 'off',
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 1
    }],
    'object-curly-spacing': ['error', 'always'],
  },
  parserOptions: {
    'parser': 'babel-eslint'
  }
}
