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
        $scope.advertisement = AdvertisementSrv.parseAdvertisement(response.advertisement);
        
         AdvertisementSrv.getDistrictsByCity().get({city: $scope.advertisement.city}).$promise.then(
            function (response) {
              if (response.errCode === 0) {
                // Parse投放商圈
                var districts = response.broadcastLocation;
                var districtStr = '';
                $scope.advertisement.broadcastLocation.forEach(function (districtId) {
                  for (var i = 0; i < districts.length; i += 1) {
                    if (districts[i].id === districtId) {
                      districtStr += (districts[i].name + ',');
                      break;
                    }
                  }
                });
                districtStr = districtStr.substring(0, districtStr.length-1);
                $scope.locations = districtStr;
              }
            }, function (error) {
              console.log('失败');
              console.log(error);
            });
    
      }
    }, function (error) {
      console.log('get advert detail error');
      console.log(error);
    });
    
    
   
    
  }
})();
