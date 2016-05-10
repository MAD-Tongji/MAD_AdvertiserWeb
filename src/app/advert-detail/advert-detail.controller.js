(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AdvertDetailCtrl', AdvertDetailCtrl);

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
