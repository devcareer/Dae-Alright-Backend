module.exports = {
    env: {
        "browser": true,
        "es6": true,
        "jest": true,
        "mocha": true,
        "node": true
    },

    extends: ["airbnb-base", "prettier"],
    plugins: ["prettier", "import"],
    globals: {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    parserOptions: {
        "sourceType": "module"
    },
    rules: {
        "arrow-parens": 0,
        "one-var": 0,
        "one-var-declaration-per-line": 0,
        "new-cap": 0,
        "consistent-return": 0,
        "no-param-reassign": 0,
        "comma-dangle": 0,
        "no-unused-vars": 0,
        "curly": ["error", "multi-line"],
        "import/no-unresolved": [2, { "commonjs": true }],
        "no-shadow": ["error", { "allow": ["req", "res", "err"] }],
        'valid-jsdoc': [
            "error",
            {
                "requireReturn": true,
                "requireReturnType": true,
                "requireParamDescription": false,
                "requireReturnDescription": true
            }
        ],
        'require-jsdoc': [
            "error",
            {
                "require": {
                    "FunctionDeclaration": true,
                    "MethodDefinition": true,
                    "ClassDeclaration": true
                }
            }
        ]
    },
}