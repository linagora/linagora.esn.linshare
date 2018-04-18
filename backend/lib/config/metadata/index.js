module.exports = dependencies => ({
  rights: {
    padmin: 'rw'
  },
  configurations: {
    apiBasePathBackend: require('./apiBasePathBackend')(dependencies),
    apiBasePathFrontend: require('./apiBasePathFrontend')(dependencies),
    instanceURL: require('./instance-url')(dependencies)
  }
});
