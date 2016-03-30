/**
 * Created by Li on 2016/3/29.
 */


(function () {
  'use strict';
  angular
    .module('mad')
    .controller('CheckAccountController', CheckAccountController);

  function CheckAccountController($scope, $http) {
    $scope.totalPay = "11111111111111";
    $scope.totalTopUp = "";
    $scope.tableContent = [["123321245657","广告标题1","2016-01-01","100000","1000"],["123321245657","广告标题2","2016-02-01","200000","1500"]]

  }

})();
