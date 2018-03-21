'use strict';

let JWT_TOKEN_TIMEOUT;
let MODULE_NAME;
let logger;
let authJwt;

module.exports = function(dependencies, lib) {
  JWT_TOKEN_TIMEOUT = lib.constants.JWT_TOKEN_TIMEOUT;
  MODULE_NAME = lib.constants.MODULE_NAME;

  logger = dependencies('logger');
  authJwt = dependencies('auth').jwt;

  return {
    generateJwtToken
  };
};

function generateJwtToken(req, res) {
  const user = req.user;
  const payload = {
    sub: user.preferredEmail,
    iss: MODULE_NAME
  };

  authJwt.generateWebToken(payload, { expiresIn: JWT_TOKEN_TIMEOUT }, (err, token) => {
    if (err || !token) {
      logger.error('Error while generating JWT token for LinShare', err);

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Error',
          details: 'Error while generating JWT token for LinShare'
        }
      });
    }

    return res.status(200).json(token);
  });
}
