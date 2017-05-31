module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "off",
        ],
        "no-unused-vars": [
            "warn",
        ],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    }
};