(function() {
  'use strict';

  angular
    .module('mad')
    .service('AdvertiserSrv', AdvertiserSrv);

  /** @ngInject */
  function AdvertiserSrv($resource, baseURL) {
    this.register = function () {
        return $resource(baseURL + '/signup');
    };
    
    this.login = function () {
        return $resource(baseURL + '/login');
    }
  }
})();
