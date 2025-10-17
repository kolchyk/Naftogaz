const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const aliasConfig = {
  resolver: {
    extraNodeModules: {
      '@': `${__dirname}/src`,
    },
  },
};

module.exports = mergeConfig(defaultConfig, aliasConfig);
