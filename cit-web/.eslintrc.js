import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import airbnb from "eslint-config-airbnb";
import prettierConfig from "eslint-config-prettier";

export default [
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
          tsx: true,
        },
      },
    },
    plugins: {
      react,
      prettier,
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    ignores: ["node_modules/", "build/"],
    rules: {
      ...airbnb.rules,
      ...prettierConfig.rules,
      "react/jsx-filename-extension": "off",
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
