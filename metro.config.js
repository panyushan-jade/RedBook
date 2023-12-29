const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const {
  resolver: {sourceExts, assetExts},
} = getDefaultConfig();

const config = {
  resolver: {
    assetExts,
    sourceExts,
    // 使用extraNodeModules声明别名
    extraNodeModules: {
      '@src': './src',
      // 这里添加你在tsconfig和babel.config中配置的其他别名
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
