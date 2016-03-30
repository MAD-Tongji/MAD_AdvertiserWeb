/**
 * Created by JiXiang on 2016/3/28.
 */
(function() {
  'use strict';

  angular
    .module('mad')
    .directive('acmeNavbarAd', acmeNavbarAd);

  /** @ngInject */
  function acmeNavbarAd() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar-ad/navbar-ad.html',
      scope: {
        creationDate: '='
      },
      controller: NavbarAdController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarAdController($scope, $location) {
      $scope.isManage = false;
      $scope.isPush = false;
      $scope.isList = false;

      $scope.isPay = false;
      $scope.isPut = false;
      $scope.isBack = false;

      $scope.isStatistics = false;
      $scope.isAccount = false;
      $scope.isAdSta = false;

      var path = $location.path();

      if (path == '/push-ad') {
        $scope.isManage = true;
        $scope.isPush = true;
      }

      if (path == '/ad-list') {
        $scope.isManage = true;
        $scope.isList = true;
      }

      if (path == '/recharge') {
        $scope.isPay = true;
        $scope.isPut = true;
      }

      if (path == '/refund') {
        $scope.isPay = true;
        $scope.isBack = true;
      }

      if (path == '/ck-account') {
        $scope.isStatistics = true;
        $scope.isAccount = true;
      }
      if (path == '/ad-statistics') {
        $scope.isStatistics = true;
        $scope.isAdSta = true;
      }
    }
  }

})();
