(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AdvertCtrl', AdvertCtrl);

  function AdvertCtrl($scope, AdvertisementSrv, NoticeSrv) {
    var i = 0;
    $scope.advertList = [];
    $scope.itemsByPage = 10;
    $scope.advertCollection = [];

    // 获取广告信息
    AdvertisementSrv.getReleaseAdvertisement().get().$promise.then(function(response) {
      if (response.errCode === 0) {
        // console.log(response.advertisement);
        for (i = 0; i < response.advertisement.length; i += 1) {
          $scope.advertList.push(AdvertisementSrv.parseAdvertisement(response.advertisement[i], i));
          // $scope.advertCollection.push(response.advertisement[i]);
      }
        // console.log($scope.advertList);
        $scope.advertCollection = [].concat($scope.advertList);
        NoticeSrv.success('获取广告列表成功');
      }
    }, function(error) {
      console.log('获取广告列表失败');
      NoticeSrv.error('获取广告列表失败');
    });

    $scope.advertCollection = [].concat($scope.advertList);

    //下架接口
    //$scope.
    //提交审核接口
  }
})();
