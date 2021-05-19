module.exports = {
  webpack: (config, options) => {
    Object.assign(config, {
      node: {
        fs: 'empty',
        child_process: 'empty',
        net: 'empty',
        tls: 'empty',
      },
    });
    config.module.rules.push({
      test: /\.tsx?|\.ts?$/,
      use: [options.defaultLoaders.babel],
    });
    return config;
  },
};
