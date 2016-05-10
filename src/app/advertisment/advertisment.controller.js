(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AdvertCtrl', AdvertCtrl);

  function AdvertCtrl($scope, AdvertisementSrv) {
    var i = 0;
    $scope.advertList = [];
    $scope.itemsByPage = 10;
    $scope.advertCollection = [];//.concat($scope.advertList);

    AdvertisementSrv.getReleaseAdvertisement().get().$promise.then(function(response) {
      if (response.errCode === 0) {
        // console.log(response.advertisement);
        for (i = 0; i < response.advertisement.length; i += 1) {
          $scope.advertList.push(AdvertisementSrv.parseAdvertisement(response.advertisement[i], i));
          // $scope.advertCollection.push(response.advertisement[i]);
      }
        // console.log($scope.advertList);
        $scope.advertCollection = [].concat($scope.advertList);
      }
    }, function(error) {
      console.log('获取广告列表失败');
    });

    $scope.advertCollection = [].concat($scope.advertList);
  }
})();

angular.module('mad').directive('stRatio',function(){
        return {
          link:function(scope, element, attr){
            var ratio=+(attr.stRatio);

            element.css('width',ratio+'%');

          }
        };
    });


angular.module('mad')
    .directive('pageSelect', function() {
      return {
        restrict: 'E',
        template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
        link: function(scope, element, attrs) {
          scope.$watch('currentPage', function(c) {
            scope.inputPage = c;
          });
        }
      }
    });
