(function() {
  'use strict';
  angular
    .module('mad')
    .controller('AccountCtrl', AccountCtrl);

  /** @ngInject */
  function AccountCtrl($scope, $http, AdvertiserSrv) {
    angular.module('tabsDemoDynamicHeight', ['ngMaterial']);
    AdvertiserSrv.getAccountDetails().get().$promise.then(function(response) {
      if (response.errCode === 0) {
        $scope.alipay = response.advertiser.alipay;
        $scope.email = response.advertiser.email;
        $scope.name = response.advertiser.name;
        var status = response.advertiser.status;
        if (status === "010") { //未审核
          $scope.notVerified = true;
          $scope.isPassed = false;
          $scope.notPassed = false;
        } else if (status === "100") {
          $scope.notVerified = false;
          $scope.isPassed = true;
          $scope.notPassed = false;
        } else {
          $scope.notVerified = false;
          $scope.isPassed = false;
          $scope.notPassed = true;
        }
      }
    });

    //TODO: 修改邮箱的接口
    //TODO: 修改支付宝的接口
    //TODO: 修改密码接口
  }
})();


