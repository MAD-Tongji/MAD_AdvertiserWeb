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
    
    this.getAdvertDetail = function () {
        return $resource(baseURL + '/statistics/detail/:id', {
          id: 'id'
        });
    };
    
    this.getStatisticsData = function() {
        return $resource(baseURL + '/statistics/data');
    };
  }
})();
