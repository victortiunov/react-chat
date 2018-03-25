module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
  },
  "rules": {
    // prettier doesn't work well with tabs
    // "indent": ["error", "tab"],
    // "no-tabs": "off",
    // "react/jsx-indent": ["error", "tab"],
    // "react/jsx-indent-props": ["error", "tab"],
    "react/prop-types": 1,
    "react/jsx-filename-extension": "off",
  }
};
