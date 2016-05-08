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
    };

    this.getAccountDetails = function () {
      return $resource(baseURL + '/account/detail');
    };

    this.getMessages = function () {
      return $resource(baseURL + '/message');
    };
  }
})();
