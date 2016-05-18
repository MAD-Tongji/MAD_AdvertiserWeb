(function() {
  'use strict';

  angular
    .module('mad')
    .service('StatisticsSrv', StatisticsSrv);

  /** @ngInject */
  function StatisticsSrv($resource, baseURL) {
    this.getAdvertisementStatistics = function () {
        return $resource(baseURL + '/statistics/all');
    };
  }
})();
