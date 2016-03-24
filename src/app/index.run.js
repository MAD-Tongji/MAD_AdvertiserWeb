(function() {
  'use strict';

  angular
    .module('mad')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
