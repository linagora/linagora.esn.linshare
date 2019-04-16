'use strict';

module.exports = function(dependencies, lib, router, moduleName) {
  const authorizationMW = dependencies('authorizationMW');
  const moduleMW = dependencies('moduleMW');
  const controller = require('./controller')(dependencies, lib);
  const middleware = require('./middleware')(dependencies);

  router.all('/token*',
    authorizationMW.requiresAPILogin,
    moduleMW.requiresModuleIsEnabledInCurrentDomain(moduleName)
  );

  router.post('/token',
    middleware.canGenerateToken,
    controller.generateJwtToken);

  return router;
};
