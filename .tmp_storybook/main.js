const path = require('path');

module.exports = {
  stories: [
    '../packages/components/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../packages/layouts/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  staticDirs: [
    '../public'
  ],
  // 'typescript': {
  //   'check': true,
  // },
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }

    // Allows Storybook to pick up modules from absolute references
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, "../packages/core/src"),
      path.resolve(__dirname, "../packages/components/src"),
      path.resolve(__dirname, "../packages/layouts/src"),
    ];
    return config;
  },
}