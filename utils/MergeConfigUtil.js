function mergeDatabaseConfig(commonConfig, environmentConfig) {
  if (!environmentConfig) {
    return {}; // Return an empty object if environmentConfig is null or undefined
  }

  return Object.keys(environmentConfig).reduce((config, key) => {
    config[key] = Object.assign({}, commonConfig, environmentConfig[key]);
    return config;
  }, {});
}

module.exports = {
  mergeDatabaseConfig,
};
