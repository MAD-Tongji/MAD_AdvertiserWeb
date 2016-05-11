(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AdvertEditCtrl', AdvertEditCtrl);

// TODO: 提交草稿按钮往后端传数据多加2个attribute: 1.add:新加的location 2.remove:减少的location；
// 保存草稿接口测试；
// 修改提交审核按钮，当没有ID时要禁用提交审核按钮；
// 取消按钮跳转已发布广告列表；
// 提交审核按钮添加成功和失败提示；
// 广告价格计算公式

  function AdvertEditCtrl($scope, $stateParams, $state, NoticeSrv, AdvertisementSrv) {
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
      id: 'Shanghai',
      city: '上海'
    }];

    var oldDistrict = [];
    var districtArray = [];
    
    if ('' !== $stateParams.advertId) {
      // 修改广告信息
      $scope.pageTitle = '修改广告';
      $scope.pageDetail = '';
      $scope.advertId = $stateParams.advertId;

      //获取广告详情
      AdvertisementSrv.getAdvertisementById().get({
        advertId: $scope.advertId
      }).$promise.then(function (response) {
        if (0 === response.errCode) {
          //console.log('advertDetail');
          //console.log(response.advertisement);

          //格式化数据
          $scope.advertisement = AdvertisementSrv.formatAdvertisement(response.advertisement);

          //获取商圈列表
          console.log($scope.advertisement.city);
          AdvertisementSrv.getDistrictsByCity().get({
            city: $scope.advertisement.city
          }).$promise.then(
            function (response) {
              if (response.errCode === 0) {
                var districts = response.broadcastLocation;
                var selected = $scope.advertisement.broadcastLocation;
                //检查selected状况并添加key
                districts.forEach(function (district) {
                  districtArray.push(district.id);
                  if (selected.indexOf(district.id) === -1) {
                    district["selected"] = false;
                  } else {
                    district["selected"] = true;
                    oldDistrict.push(district.id);
                  }
                });
                $scope.districts = districts;
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
    } else {
      // 新增广告
      // 修改标题
      $scope.pageTitle = '新增广告';
      $scope.pageDetail = '所有信息都必填';
      $scope.advertId = null;
      
      // 初始化广告数据
      $scope.advertisement = {
        city: 'Shanghai',
        catalog: 'other'
      };
      
      AdvertisementSrv.getDistrictsByCity().get({
            city: $scope.advertisement.city
          }).$promise.then(
            function (response) {
              if (response.errCode === 0) {
                var districts = response.broadcastLocation;
                $scope.advertisement.broadcastLocation = [];
                //检查selected状况并添加key
                districts.forEach(function (district) {
                  districtArray.push(district.id);
                  district["selected"] = true;
                  $scope.advertisement.broadcastLocation.push(district.id);
                  oldDistrict.push(district.id);
                });
                $scope.districts = districts;
                
              }
            }, function (error) {
              console.log('失败');
              console.log(error);
            });
    }

    
    //暂存草稿
    $scope.saveDraft = function() {
      //console.log($scope.advertisement);
      if (!$scope.advertisement || !$scope.advertisement.title
      || !$scope.advertisement.content || !$scope.advertisement.catalog
      || !$scope.advertisement.city || !$scope.advertisement.startDate || !$scope.advertisement.endDate) {
        console.log('输入检查');
        NoticeSrv.notice('请输入完整广告信息');
        return;
      }
      
      // 比对district
      var adds = [];
      var removes = [];
      var selectedArray = [];
      $scope.districts.forEach(function (district) {
        if (district.selected) {
          selectedArray.push(district.id);
        }
      });
      var selectedSet = new Set(selectedArray);
      var oldDistrictSet = new Set(oldDistrict);
      if ($scope.advertId) {
        districtArray.forEach(function (district) {
          if (selectedArray.has(district) && !oldDistrictSet.has(district)) {
            adds.push(district);
          } else if (!selectedArray.has(district) && oldDistrictSet.has(district)) {
            removes.push(district);
          }
        });
      } else {
        adds = selectedArray;
      }
      
      
      
      
      
      var advertisement = $scope.advertisement;

      // 格式化时间
      // 计算广告价格
      AdvertisementSrv.saveDraftAdvertisement().save({
        "id": $scope.advertId,
        "title": advertisement.title,
        "content": advertisement.content,
        "catalog": advertisement.catalog,
        "add": adds,
        "remove": removes,
        "startDate": advertisement.startDate,
        "endDate": advertisement.endDate,
        "city": advertisement.city,
        "price": 10.0
      }).$promise.then(
        function (response) {
          if (response.errCode === 0) {
            console.log('保存草稿成功');
            console.log(response);
            NoticeSrv.success('保存草稿成功');
            $state.go('app.advert.edit', {advertId: response.id});
          }

        }, function (error) {
          console.log('保存草稿失败');
          console.log(error);
          NoticeSrv.error('保存草稿失败');
        });
    };

    //审核提交
    $scope.submitApply = function() {
      console.log($scope.advertisement);
      if (!$scope.advertisement || !$scope.advertisement.title
        || !$scope.advertisement.content || !$scope.advertisement.catalog
        || !$scope.advertisement.city || !$scope.advertisement.startDate || !$scope.advertisement.endDate) {
        console.log('输入检查');

        return;
      }

      AdvertisementSrv.submitAdvertisementById().get({
        "id": $scope.advertId
      }).$promise.then(
        function (response) {
          if (response.errCode === 0) {
            $scope.resultTitle = '提交成功';
            $scope.resultDetail = '您的广告（编号为：'+$scope.advertId+'）已经提交至审核区，您可以在消息通知中查看审核结果，请耐心等待，谢谢！';
            $('#successModal').modal('show');
            console.log(response);
          } else {
            $scope.thereIsError = true;
            $scope.errMessage = '未知错误: '+response.errCode;
          }
        }, function (error) {
          $scope.thereIsError = true;
          $scope.errMessage = '未知错误: '+error;
          console.log('提交失败');
          console.log(error);
        });
    };
  }
})();
