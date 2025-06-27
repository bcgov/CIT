import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import airbnbBase from "eslint-config-airbnb-base";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        browser: true,
        es6: true,
        jest: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      react: {
        version: "detect",
      },
    },
    ignores: ["node_modules/", "build/"],
    rules: {
      ...airbnbBase.rules,
      ...prettierConfig.rules,
      ...reactPlugin.configs.recommended.rules,
      "react/jsx-filename-extension": ["off"],
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-one-expression-per-line": "off",
      "no-alert": "off",
      "no-restricted-globals": "off",
      "import/no-extraneous-dependencies": "off",
      "no-unused-vars": "warn",
      "no-nested-ternary": "off",
      "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
      "prettier/prettier": ["error"],
    },
  },
];
