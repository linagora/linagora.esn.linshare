'use strict';

module.exports = function() {
  return {
    canGenerateToken
  };
};

function canGenerateToken(req, res, next) {
  // everyone can use Linshare
  next();
}
