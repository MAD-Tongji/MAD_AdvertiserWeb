(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AccountRechargeCtrl', AccountRechargeCtrl);

  function AccountRechargeCtrl($scope, $http, AdvertiserSrv) {
    // 显示余额
    $scope.getBalance = function getBalance(button) {
      //TODO: 显示余额API
      $('#balance-btn').hide();
      $('#balance-label').show();
    };

    $scope.recharge = function () {

    }
  }
})();
