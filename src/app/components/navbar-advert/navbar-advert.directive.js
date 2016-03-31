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
      templateUrl: 'app/components/navbar-advert/navbar-advert.html',
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
      console.log('path:' + path);
      if (path == '/advert/push') {
        $scope.isManage = true;
        $scope.isPush = true;
      }

      if (path == '/advert') {
        $scope.isManage = true;
        $scope.isList = true;
      }

      if (path == '/account/reacharge') {
        $scope.isPay = true;
        $scope.isPut = true;
      }

      if (path == '/account/refund') {
        $scope.isPay = true;
        $scope.isBack = true;
      }

      if (path == '/account/check') {
        $scope.isStatistics = true;
        $scope.isAccount = true;
      }
      if (path == '/statistics') {
        $scope.isStatistics = true;
        $scope.isAdSta = true;
      }
    }
  }

})();
