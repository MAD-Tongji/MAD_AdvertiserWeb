(function() {
  'use strict';

  angular
    .module('mad')
    .controller('AdvertPushCtrl', AdvertPushCtrl);

  /** @ngInject */
  function AdvertPushCtrl($scope, AdvertisementSrv) {
    $scope.draft = {};
    // |1|accommodation|
    // |2|commodity|
    // |3|education|
    // |4|entertainment|
    // |5|recruit|
    // |6|service|
    // |7|social|
    // |8|tenancy|
    // |9|other|
    
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

    $scope.draft.advertType = $scope.advertTypes[0].id;

    $scope.advertCities = [{
      id: 1,
      city: '上海'
    }]

    $scope.draft.advertCity = $scope.advertCities[0].id;
    
    $scope.saveDraft = function() {
      console.log($scope.draft);
      if (!$scope.draft || !$scope.draft.title 
      || !$scope.draft.content || !$scope.draft.advertType 
      || !$scope.draft.advertCity || !$scope.draft.startDate || !$scope.draft.endDate) {
        console.log('输入检查');        
        return;
      }
      var draft = $scope.draft;
      
      // 格式化时间
      // 计算广告价格
      
      AdvertisementSrv.saveDraftAdvertisement().save({
        "id": null,
        "title": draft.title, 
        "content": draft.content, 
        "catalog": draft.advertType, 
        "broadcastlocation":['district_name1','district_name2'],
        "startDate": draft.startDate,
        "endDate": draft.endDate, 
        "city": draft.advertCity,
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
