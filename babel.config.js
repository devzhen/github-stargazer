module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@config': './src/config',
          '@hooks': './src/hooks',
          '@hocs': './src/hocs',
          '@interfaces': './src/interfaces',
          '@modules': './src/modules',
          '@helpers': './src/helpers',
          '@services': './src/services',
          '@theme': './src/theme',
          '@testHelpers': './testHelpers',
        },
      },
    ],
  ],
};
