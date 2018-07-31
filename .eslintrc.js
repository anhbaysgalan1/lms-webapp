module.exports = {
<<<<<<< HEAD
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true
    },
    "settings": {
        "import/resolver": {
          "node": {
            "paths": ["src"]
          }
        }
    },
    "rules": {
        'no-underscore-dangle': ['error', {
            allow: ["_id"],
            allowAfterThis: false,
            allowAfterSuper: false,
            enforceInMethodNames: false,
        }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
=======
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'no-console': 'off',
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
>>>>>>> admin-classroom
    }
};