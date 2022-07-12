module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    // "../../packages/@icatalyst/**/*.stories.@(js|jsx|ts|tsx)"
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    // "../../@icatalyst/**/*.stories.@(js|jsx|ts|tsx)"


  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-controls'
  ],
  "framework": "@storybook/react"
}
