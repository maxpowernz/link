module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "prefer-const": "warn",
    "import/no-named-as-default": 0,
  },
  parserOptions: {
    babelOptions: {
      //presets: [require.resolve('next/babel')],
    },
  },
};
