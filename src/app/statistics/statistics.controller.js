/**
 * Created by LENOVO on 2016/3/29.
 */
(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AdvertSatisticsCtrl', AdvertSatisticsCtrl);

  function AdvertSatisticsCtrl($scope) {
    $scope.totalPay = "111111";
    $scope.totalTopUp = "222";
    $scope.tableContent = [["123321245657","广告标题1","2016-01-01","100000","1000"],["123321245657","广告标题2","2016-02-01","200000","1500"]]
  }


})();
