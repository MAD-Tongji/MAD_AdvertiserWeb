/**
 * Created by JiXiang on 2016/3/28.
 */
(function () {
  'use strict';
  angular
    .module('mad')
    .controller('PushAdController', PushAdController);

  function PushAdController($scope, $http) {
    $scope.adTypes = [{
      id: 1,
      adType: '公益广告'
    }, {
      id: 2,
      adType: '促销广告'
    }, {
      id: 3,
      adType: '宣传广告'
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
