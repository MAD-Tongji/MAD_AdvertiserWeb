(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AdvertModifyCtrl', AdvertModifyCtrl);

  function AdvertModifyCtrl($scope, $stateParams, $state, AdvertisementSrv) {
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

    //获取id
    $scope.advertId = $stateParams.advertId;
    var selectedBefore;

    //获取广告详情
    AdvertisementSrv.getAdvertisementById().get({
      advertId: $scope.advertId
    }).$promise.then(function (response) {
      if (0 === response.errCode) {

        //格式化数据
        $scope.advertisement = AdvertisementSrv.formatAdvertisement(response.advertisement);

        //获取商圈列表
        console.log($scope.advertisement.city);
        AdvertisementSrv.getDistrictsByCity().get({
          city: $scope.advertisement.city
        }).$promise.then(
          function (response) {
            if (response.errCode === 0) {
              //获取所有行政区
              var districts = response.broadcastLocation;
              //获取原来选中的行政区
              var selected = $scope.advertisement.broadcastLocation;
              selectedBefore = $scope.advertisement.broadcastLocation;
              //检查selected状况并添加key
              districts.forEach(function (district) {
                if (selected.indexOf(district.id) === -1) {
                  district["selected"] = false;
                } else {
                  district["selected"] = true;
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

    //暂存草稿
    $scope.saveDraft = function() {
      // 获取最后被选中的行政区
      var selectedArray = [];
      $scope.districts.forEach(function (district) {
        if (district.selected) {
          selectedArray.push(district.id);
        }
      });
      // 输入检查
      if (!$scope.advertisement || !$scope.advertisement.title
      || !$scope.advertisement.content || !$scope.advertisement.catalog
      || !$scope.advertisement.city || !$scope.advertisement.startDate || !$scope.advertisement.endDate) {
        console.log('输入检查');
        return;
      }
      var advertisement = $scope.advertisement;

      // TODO: 格式化时间
      // TODO: 计算广告价格

      // 往后端传,多加2个attribute: 1.add:新加的location 2.remove:减少的location
      var result = compareArray(selectedBefore, selectedArray);
      console.log("selectedBefore:");
      console.log(selectedBefore);
      console.log("selectedArray:");
      console.log(selectedArray);
      console.log("added:");
      console.log(result.add);
      console.log("removed:");
      console.log(result.remove);
      // 发送请求
      AdvertisementSrv.saveDraftAdvertisement().save({
        "id": $scope.advertId,
        "title": advertisement.title,
        "content": advertisement.content,
        "catalog": advertisement.catalog,
        "broadcastLocation": selectedArray,
        "startDate": advertisement.startDate,
        "endDate": advertisement.endDate,
        "city": advertisement.city,
        "price": 10.0,
        "add": result.add,
        "remove": result.remove
      }).$promise.then(
        function (response) {
          if (response.errCode === 0) {
            console.log('保存草稿成功');
            console.log(response);
            $('#successModal').modal('show');
          }

        }, function (error) {
          console.log('保存草稿失败');
          console.log(error);
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
            $state.go('app.advert.modify', {advertId: $scope.advertId}, {reload: true});
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

    /**
     * helper: 比较两个array并返回add和remove
     * @param before
     * @param after
     */
    var compareArray = function(before,after) {
      var add = new Array;
      var remove = new Array;
      // 对于每个after,如果不存在于before中,则添加入add数组
      after.forEach(function (aft) {
        if(before.indexOf(aft) === -1) {
          add.push(aft);
        }
      });
      // 对于每个before,如果不存在于after中,则添加入remove
      before.forEach(function (bef) {
        if(after.indexOf(bef) === -1) {
          remove.push(bef);
        }
      });
      return {
        add: add,
        remove: remove
      }
    }
  }
})();
