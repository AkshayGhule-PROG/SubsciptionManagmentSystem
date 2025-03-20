import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // Add Node.js globals, including `process`
        ...globals.browser // Retain browser globals too, if needed
      }
    }
  },
  pluginJs.configs.recommended,
];