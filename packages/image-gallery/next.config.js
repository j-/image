module.exports = {
  webpack: (config, options) => {
    config.resolve.fallback = {
      fs: false,
      child_process: false,
      net: false,
      tls: false,
    };
    config.module.rules.push({
      test: /\.tsx?|\.ts?$/,
      use: [options.defaultLoaders.babel],
    });
    return config;
  },
};
