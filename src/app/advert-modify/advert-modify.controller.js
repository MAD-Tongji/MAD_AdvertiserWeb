(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AdvertModifyCtrl', AdvertModifyCtrl);

  function AdvertModifyCtrl($scope, $stateParams, AdvertisementSrv) {
    $scope.advertTypes = [{
      id: 'other',
      type: '其他'
    },{
      id: 'accommodation',
      type: '食宿'
    }, {
      id: 'commodity',
      type: '商品'
    }, {
      id: 'education',
      type: '教育'
    },{
      id: 'entertainment',
      type: '影视娱乐'
    },{
      id: 'recruit',
      type: '招聘'
    },{
      id: 'service',
      type: '服务'
    },{
      id: 'social',
      type: '社交'
    },{
      id: 'tenancy',
      type: '租赁'
    }];

    $scope.advertCities = [{
      id: 1,
      city: '上海'
    }];

    
    $scope.advertId = $stateParams.advertId;
    
    //获取广告详情
    AdvertisementSrv.getAdvertisementById().get({
      advertId: $scope.advertId
    }).$promise.then(function (response) {
      if (0 === response.errCode) {
        console.log('advertDetail');
        console.log(response.advertisement);
        
        //格式化数据
        $scope.advertisement = AdvertisementSrv.formatAdvertisement(response.advertisement);
      }
    }, function (error) {
      console.log('get advert detail error');
      console.log(error);
    });
    
    //暂存草稿
    $scope.saveadvertisement = function() {
      console.log($scope.advertisement);
      if (!$scope.advertisement || !$scope.advertisement.title 
      || !$scope.advertisement.content || !$scope.advertisement.advertType 
      || !$scope.advertisement.advertCity || !$scope.advertisement.startDate || !$scope.advertisement.endDate) {
        console.log('输入检查');
        
        return;
      }
      var advertisement = $scope.advertisement;
      
      // 格式化时间
      // 计算广告价格
      
      AdvertisementSrv.saveadvertisementAdvertisement().save({
        "title": advertisement.title, 
        "content": advertisement.content, 
        "catalog": advertisement.advertType, 
        "broadcastlocation":['district_name1','district_name2'],
        "startDate": advertisement.startDate,
        "endDate": advertisement.endDate, 
        "city": advertisement.advertCity,
        "price": 10.0 
      }).$promise.then(
        function (response) {
          if (response.errCode === 0) {
            console.log('保存草稿成功');
            console.log(response);
          }
          
        }, function (error) {
          console.log('保存草稿失败');
          console.log(error);
        });
    }
  }
})();
