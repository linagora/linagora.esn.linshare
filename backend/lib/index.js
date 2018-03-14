'use strict';

const constants = require('./constants');

module.exports = dependencies => {
  const config = require('./config')(dependencies);

  function init() {
    config.init();
  }

  return {
    init,
    constants
  };
};
