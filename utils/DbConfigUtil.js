/**
 * Generates a database connection configuration for a given environment.
 * @param {string} envPrefix - The prefix for the environment variables.
 * @returns {Object} The connection configuration object.
 */
function generateDbConnection(envPrefix) {
  return {
    host: process.env[`${envPrefix}_HOST`],
    user: process.env[`${envPrefix}_USER`],
    password: process.env[`${envPrefix}_PASSWORD`],
    database: process.env[`${envPrefix}_DATABASE`],
  };
}

module.exports = {
  generateDbConnection,
};
