'use strict';

module.exports = dependencies => {
  const config = require('./config')(dependencies);

  function init() {
    config.init();
  }

  return {
    init
  };
};
