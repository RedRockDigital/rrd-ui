module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        // "plugin:react/hooks",
        "standard",
    ],
    globals: {
        rewardful: true,
        Rewardful: true,
    },
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "react",
        "react-hooks",
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        quotes: ["error", "double"],
        semi: ["error", "always"],
        indent: ["error", 4, {
            SwitchCase: 1,
            flatTernaryExpressions: false,
            offsetTernaryExpressions: true,
            ignoredNodes: ["TemplateLiteral > *"],
        }],
        "comma-dangle": ["error", {
            arrays: "always-multiline",
            objects: "always-multiline",
            imports: "always-multiline",
            exports: "always-multiline",
        }],
        "object-curly-spacing": ["error", "always", { arraysInObjects: false }],
    },
};
