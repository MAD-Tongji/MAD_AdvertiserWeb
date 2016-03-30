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
      
      $scope.isStatistics = false;
      $scope.isAdSta = false;

      var path = $location.path();
      console.log(path);
      if (path == '/ad-statistics') {
        $scope.isStatistics = true;
        $scope.isAdSta = true;
      }
      if (path == '/push-ad') {
        $scope.isManage = true;
        $scope.isPush = true;
        // $scope.isList = false;
        // $scope.isStatistics = false;
      }
      if (path == '/ad-list') {
        $scope.isManage = true;
        $scope.isList = true;
        // $scope.isPush = false;
        // $scope.isStatistics = false;
      }
    }
  }

})();
