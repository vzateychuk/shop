module.exports = {
    env: {
        browser: true,
        es6: true
    },
    "extends": [
        "eslint:recommended",                           // Базовый набор правил eslint
        "plugin:@typescript-eslint/eslint-recommended", // Отключаем правила из базового набора
        "plugin:@typescript-eslint/recommended",         // Базовые правила для TypeScript
        "plugin:@typescript-eslint/recommended-requiring-type-checking" // Правила TS, требующие инфо о типах
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module",
        "project": "tsconfig.json",
		"tsconfigRootDir": "."
    },
    "plugins": [
        "@typescript-eslint"
    ],
    ignorePatterns: ["*.spec.ts"],
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": 0  // 0 = off, 1 = warn, 2 = error
    }
};
