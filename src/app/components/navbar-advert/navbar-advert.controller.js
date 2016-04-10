(function() {
  'use strict';

  angular
    .module('mad')
    .controller('HeaderCtrl', HeaderCtrl);

  /** @ngInject */
  function HeaderCtrl($scope, $location, $injector) {
    $injector.get('$templateCache').removeAll();
    $scope.isMain = false;

    $scope.isManage = false;
    $scope.isPush = false;
    $scope.isList = false;

    $scope.isPay = false;
    $scope.isPut = false;
    $scope.isBack = false;
    $scope.isConfirm = false;

    $scope.isStatistics = false;
    $scope.isAccount = false;
    $scope.isAdSta = false;

    $scope.isMsg = false;

    if ($location.path() == '/') {
      $scope.isMain = true;
    }

    if ($location.path() == '/advert/push') {
      $scope.isManage = true;
      $scope.isPush = true;
    }

    if ($location.path() == '/advert') {
      $scope.isManage = true;
      $scope.isList = true;
    }

    if ($location.path() == '/account/recharge') {
      $scope.isPay = true;
      $scope.isPut = true;
    }

    if ($location.path() == '/account/refund') {
      $scope.isPay = true;
      $scope.isBack = true;
    }

    if ($location.path() == '/account/check') {
      $scope.isPay = true;
      $scope.isConfirm = true;
    }

    if ($location.path() == '/statistics') {
      $scope.isStatistics = true;
      $scope.isAccount = true;
    }

    if ($location.path() == '/statistics/detail') {
      $scope.isStatistics = true;
      $scope.isAdSta = true;
    }

    if ($location.path() == '/notification') {
      $scope.isMsg = true;
    }
  }
})();
