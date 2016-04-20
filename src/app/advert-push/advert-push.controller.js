(function() {
  'use strict';

  angular
    .module('mad')
    .controller('AdvertPushCtrl', AdvertPushCtrl);

  /** @ngInject */
  function AdvertPushCtrl($scope) {
    $scope.adTypes = [{
      id: 1,
      adType: '教育广告'
    }, {
      id: 2,
      adType: '商业广告'
    }, {
      id: 3,
      adType: '生活广告'
    }];

    $scope.adType = $scope.adTypes[0].id;

    $scope.adCities = [{
      id: 1,
      adCity: '上海'
    }, {
      id: 2,
        adCity: '北京'
    }, {
      id: 3,
      adCity: '广州'
    }]

    $scope.adCity = $scope.adCities[0].id;

    $scope.adPeriods = [{
      id: 1,
      adPeriod: '06:00-9:00'
    }, {
      id: 2,
      adPeriod: '09:00-12:00'
    }, {
      id: 3,
      adPeriod: '12:00-15:00'
    }, {
      id: 4,
      adPeriod: '15:00-18:00'
    }, {
      id: 5,
      adPeriod: '18:00-21:00'
    }, {
      id: 6,
      adPeriod: '21:00-24:00'
    }]

    $scope.adPeriod = $scope.adPeriods[0].id;

  }
})();
