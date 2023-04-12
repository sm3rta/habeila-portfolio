/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
module.exports = {
  plugins: ["solid", "jsx-a11y", "@typescript-eslint"],

  rules: {
    // "solid/reactivity": "warn",
    // "solid/no-destructure": "warn",
    // "solid/jsx-no-undef": "error",
    "no-mixed-spaces-and-tabs": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-non-null-assertion": "off",
  },
  extends: [
    "eslint:recommended",
    "plugin:solid/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022,
    ecmaFeatures: {
      jsx: true,
    },
  },
};
