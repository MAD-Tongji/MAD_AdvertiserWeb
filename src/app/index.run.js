(function() {
  'use strict';

  angular
    .module('madAdvertiserWeb')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
