module.exports = {
    "extends": [ 'next', 'next/core-web-vitals', 'prettier',     'plugin:@typescript-eslint/recommended' ],
    "plugins": [ "@typescript-eslint", "prettier", "unused-imports" ],
    "rules": {
        "prefer-const": "error",
        "@typescript-eslint/no-unused-vars": "warn",
        "no-console": "off",
        "react/no-unescaped-entities": "off", // Disabling the rule here
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "error",
    },
};