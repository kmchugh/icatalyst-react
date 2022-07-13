module.exports = {
  "stories": [
    "../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "staticDirs": [
    '../public'
  ],
  "framework": "@storybook/react"
}