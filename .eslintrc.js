module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended', // Use the recommended rules from eslint
    'plugin:react/recommended', // Use recommended rules from eslint-plugin-react
    'plugin:react-native/all', // Use all rules from eslint-plugin-react-native
    'plugin:@typescript-eslint/recommended', // Use recommended rules from @typescript-eslint/eslint-plugin
  ],
  plugins: ['react', 'react-native', 'react-hooks', '@typescript-eslint'],
  env: {
    'react-native/react-native': true,
  },
  rules: {
    // Example custom rules
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react-native/no-inline-styles': 'error', // Disallow inline styles
    'react-native/no-color-literals': 'error', // Enforce variables when using color properties
    'react-native/no-raw-text': 'error', // Disallow children as raw text
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
    '@typescript-eslint/explicit-function-return-type': 'warn', // Consider using explicit return type for functions
    '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}], // Allow unused vars that start with an underscore
    '@typescript-eslint/no-explicit-any': 'error', // Disallow usage of the any type
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
};
