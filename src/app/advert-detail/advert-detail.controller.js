(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AdvertDetailCtrl', AdvertDetailCtrl);

// TODO: 广告时间显示不太正常；广告地点应该显示城区

  function AdvertDetailCtrl($scope, $stateParams, AdvertisementSrv) {
    $scope.advertId = $stateParams.advertId;
    AdvertisementSrv.getAdvertisementById().get({
      advertId: $scope.advertId
    }).$promise.then(function (response) {
      if (0 === response.errCode) {
        console.log('advertDetail');
        console.log(response.advertisement);
        $scope.advertisement = response.advertisement;
      }
    }, function (error) {
      console.log('get advert detail error');
      console.log(error);
    });
    
  }
})();
