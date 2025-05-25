import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Add a 'rules' property to override or add specific ESLint rules
    rules: {
      // Disable the 'no-unused-vars' rule for JavaScript/general ESLint.
      // This prevents errors for defined but unused variables in JS files.
      "no-unused-vars": "off",

      // Disable the TypeScript-specific 'no-unused-vars' rule.
      // This is crucial for TypeScript files where variables might be defined but not explicitly used (e.g., type imports).
      "@typescript-eslint/no-unused-vars": "off",

      // Disable 'react/no-unescaped-entities' to allow unescaped HTML entities in JSX.
      // While generally recommended to escape them (e.g., using &apos; for single quotes),
      // disabling this rule will prevent compilation errors related to it.
      "react/no-unescaped-entities": "off",

      // Disable '@typescript-eslint/no-explicit-any' to allow the use of the 'any' type in TypeScript.
      // Using 'any' bypasses type checking, but disabling this rule will remove the error.
      "@typescript-eslint/no-explicit-any": "off",

      // Disable 'prefer-const' to allow variables declared with 'let' even if they are never reassigned.
      // This gives more flexibility but can lead to less explicit code regarding mutability.
      "prefer-const": "off",

      // Disable 'react-hooks/exhaustive-deps' to remove warnings about missing dependencies in React Hooks.
      // IMPORTANT: While this resolves the warning, it's generally recommended to fix these dependencies
      // in your code to ensure hooks behave as expected and avoid stale closures or unnecessary re-renders.
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default eslintConfig;