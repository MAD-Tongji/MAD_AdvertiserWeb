(function() {
  'use strict';

  angular
    .module('mad')
    .service('AdvertisementSrv', AdvertisementSrv);

  /** @ngInject */
  function AdvertisementSrv($resource, baseURL) {
    this.getReleaseAdvertisement = function () {
        return $resource(baseURL + '/advertisement/list/all');
    };
    
    this.saveNewAdvertisementToDraft = function () {
        return $resource(baseURL + '/');
    };
    
    this.getAdvertisementById = function () {
        return $resource(baseURL + '/');
    }
  }
})();
