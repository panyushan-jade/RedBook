module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          "@src": "./src",
          // 添加更多别名...
        },
      },
    ],
  ],
};
