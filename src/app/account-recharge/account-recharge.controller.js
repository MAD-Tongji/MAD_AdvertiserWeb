(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AccountRechargeCtrl', AccountRechargeCtrl);

  function AccountRechargeCtrl($scope, $http) {
    $scope.getBalance = function getBalance(button) {
      //$(button).hide();
      //console.log(button);
      //console.log($('#balance-btn'));
      $('#balance-btn').hide();
      $('#balance-label').show();
    }

  }
})();
