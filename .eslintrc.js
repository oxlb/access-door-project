module.exports = {
  extends: [
    "standard", // Keep this if you're using the Standard style guide
    "prettier",
  ],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    node: true,
    es6: true,
    jest: true,
    mocha: true,
  },
  rules: {
    "space-before-function-paren": 0,
    "new-cap": 0,
    "prettier/prettier": "error",
    "no-unused-expressions": 0,
    "no-unused-vars": ["error", { varsIgnorePattern: "should|expect" }],
  },
};
