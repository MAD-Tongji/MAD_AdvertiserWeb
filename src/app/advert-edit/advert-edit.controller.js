(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AdvertEditCtrl', AdvertEditCtrl);

  function AdvertEditCtrl($scope, $stateParams, $state, NoticeSrv, AdvertisementSrv) {
    $scope.advertTypes = AdvertisementSrv.advertTypes;

    $scope.advertCities = AdvertisementSrv.advertCities;

    var selectedBefore = [];

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
    } else {
      // 新增广告
      // 修改标题
      $scope.pageTitle = '新增广告';
      $scope.pageDetail = '所有信息都必填';
      $scope.advertId = null;

      // 初始化广告数据
      $scope.advertisement = {
        city: 'Shanghai',
        catalog: 'other',
        price: '0'
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
                //  districtArray.push(district.id);
                 
                 district["selected"] = true;
                 $scope.advertisement.broadcastLocation.push(district.id);
                 selectedBefore.push(district.id);
               });
               $scope.districts = districts;
      
             }
           }, function (error) {
             console.log('失败');
             console.log(error);
           });
    }
    
    function wordCount(input) {
      var wordNum = 0;
      var contentArray = input.split(' ');
      var wordArray;
      contentArray.forEach(function (word) {
        if (word.search(/[\u4e00-\u9fa5]/g) !== -1) {
          // 有汉字，再切一次
          wordArray = word.split('');
          wordNum += wordArray.length;
        } else {
          wordNum += 1;
        }
      });
      return wordNum;
    }
    
    function districtCount(districts) {
      var num = 0;
      districts.forEach(function (district) {
        if (district.selected) {
          num += 1;
        }
      });
      return num;
    }
    
    function calculatePrice(fontNum, districtNum) {
      var price = (fontNum/districtNum);
      return price.toFixed(2);
    }
      
    $scope.changeContent = function (newVal) {
      if (newVal) {
        var wordNum = wordCount(newVal);
        var districtNum = districtCount($scope.districts);
        $scope.advertisement.price = calculatePrice(wordNum, districtNum);
        console.log($scope.advertisement.price);
      }
    };
    
    $scope.changeDistrict = function () {
      // 遍历districts
      var num = districtCount($scope.districts);
      if (num !== 0 && $scope.advertisement.content) {
        // 字数或者单词数
        var wordNum = wordCount($scope.advertisement.content);
        
        $scope.advertisement.price = calculatePrice(wordNum, num); 
      } else {
        $scope.advertisement.price = 0;
      }
      console.log($scope.advertisement.price);
    };
    

    //暂存草稿
    $scope.saveDraft = function() {
      // 获取最后被选中的行政区
      var selectedArray = [];
      $scope.districts.forEach(function (district) {
        if (district.selected) {
          selectedArray.push(district.id);
        }
      });

      // 获取原先选中的行政区
      selectedBefore = $scope.advertisement.broadcastLocation;
      // 输入检查
      if (!$scope.advertisement || !$scope.advertisement.title
        || !$scope.advertisement.content || !$scope.advertisement.catalog
        || !$scope.advertisement.city || !$scope.advertisement.startDate || !$scope.advertisement.endDate) {
        console.log('输入检查');
        NoticeSrv.notice('请输入完整信息');
        return;
      }
      var advertisement = $scope.advertisement;

      var startDate = AdvertisementSrv.parseDate($scope.advertisement.startDate);
      var endDate = AdvertisementSrv.parseDate($scope.advertisement.endDate);
      
      // 往后端传,多加2个attribute: 1.add:新加的location 2.remove:减少的location
      var result = compareArray(selectedBefore, selectedArray);
      //console.log("selectedBefore:");
      //console.log(selectedBefore);
      //console.log("selectedArray:");
      //console.log(selectedArray);
      //console.log("added:");
      //console.log(result.add);
      //console.log("removed:");
      //console.log(result.remove);
      // 发送请求
      AdvertisementSrv.saveDraftAdvertisement().save({
        "id": $scope.advertId,
        "title": advertisement.title,
        "content": advertisement.content,
        "catalog": advertisement.catalog,
        "broadcastLocation": selectedArray,
        "startDate": startDate,
        "endDate": endDate,
        "city": advertisement.city,
        "price": advertisement.price,
        "add": result.add,
        "remove": result.remove
      }).$promise.then(
        function (response) {
          if (response.errCode === 0) {
            console.log('保存草稿成功');
            console.log(response);
            // $('#successModal').modal('show');
            $state.go('app.advert.edit', {advertId: response.id});
            NoticeSrv.success('保存草稿成功');
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
            $('#successModal').modal('show');
            console.log(response);
          }
          //  else {
          //   $scope.thereIsError = true;
          //   $scope.errMessage = '未知错误: '+response.errCode;
          // }
        }, function (error) {
          $scope.thereIsError = true;
          $scope.errMessage = '未知错误: '+error;
          console.log('提交失败');
          console.log(error);
        });
    };
    
    $('#successModal').on('hidden.bs.modal', function (e) {
      $state.go('app.advert');
    });

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
