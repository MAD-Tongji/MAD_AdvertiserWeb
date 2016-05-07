(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AdvertCtrl', AdvertCtrl);

  function AdvertCtrl($scope, AdvertisementSrv) {
    
    $scope.taskList = [];
    $scope.itemsByPage = 5;
    // $scope.advertCollection = [].concat($scope.advertList);
    
    AdvertisementSrv.getReleaseAdvertisement().get().$promise.then(function(response) {
      if (response.errCode === 0) {
        console.log(response.advertisement);
      }
    })
    
    
    
    // $scope.advertList = [{
    //   adId: '893729872939',
    //   adTitle: '家教招聘',
    //   adState: '草稿',
    //   stateClass: '',
    //   createDate: '2015-01-01',
    //   viewAd: '查看',
    //   isDisableModify: true,
    //   isDisableDelete: true,
    //   isDisableCancel: false,
    //   isDisableOff: false,
    //   isDisableRe: false
    //   },
    //   {
    //     adId: '893729872940',
    //     adTitle: '厨师招聘',
    //     adState: '审核中',
    //     stateClass: '',
    //     createDate: '2015-03-17',
    //     viewAd: '查看',
    //     isDisableModify: false,
    //     isDisableDelete: false,
    //     isDisableCancel: true,
    //     isDisableOff: false,
    //     isDisableRe: false
    //   },
    //   {
    //     adId: '893729872941',
    //     adTitle: '老师招聘',
    //     adState: '审核已通过',
    //     stateClass: '',
    //     createDate: '2015-04-05',
    //     viewAd: '查看',
    //     isDisableModify: false,
    //     isDisableDelete: false,
    //     isDisableCancel: false,
    //     isDisableOff: true,
    //     isDisableRe: false
    //   },
    //   {
    //     adId: '893729872942',
    //     adTitle: '保姆招聘',
    //     adState: '审核未通过',
    //     stateClass: 'jx-notPass',
    //     createDate: '2015-01-01',
    //     viewAd: '查看',
    //     isDisableModify: false,
    //     isDisableDelete: true,
    //     isDisableCancel: false,
    //     isDisableOff: false,
    //     isDisableRe: true
    //   },
    //   {
    //     adId: '893729872943',
    //     adTitle: '公益广告',
    //     adState: '投放中',
    //     stateClass: 'jx-putting',
    //     createDate: '2015-09-10',
    //     viewAd: '查看',
    //     isDisableModify: false,
    //     isDisableDelete: false,
    //     isDisableCancel: false,
    //     isDisableOff: true,
    //     isDisableRe: false
    //   },
    //   {
    //     adId: '893729872942',
    //     adTitle: '保姆招聘',
    //     adState: '审核未通过',
    //     stateClass: 'jx-notPass',
    //     createDate: '2015-01-01',
    //     viewAd: '查看',
    //     isDisableModify: false,
    //     isDisableDelete: true,
    //     isDisableCancel: false,
    //     isDisableOff: false,
    //     isDisableRe: true
    //   },
    //   {
    //     adId: '893729872943',
    //     adTitle: '公益广告',
    //     adState: '投放中',
    //     stateClass: 'jx-putting',
    //     createDate: '2015-09-10',
    //     viewAd: '查看',
    //     isDisableModify: false,
    //     isDisableDelete: false,
    //     isDisableCancel: false,
    //     isDisableOff: true,
    //     isDisableRe: false
    //   },
    //   {
    //     adId: '893729872942',
    //     adTitle: '保姆招聘',
    //     adState: '审核未通过',
    //     stateClass: 'jx-notPass',
    //     createDate: '2015-01-01',
    //     viewAd: '查看',
    //     isDisableModify: false,
    //     isDisableDelete: true,
    //     isDisableCancel: false,
    //     isDisableOff: false,
    //     isDisableRe: true
    //   },
    //   {
    //     adId: '893729872943',
    //     adTitle: '公益广告',
    //     adState: '投放中',
    //     stateClass: 'jx-putting',
    //     createDate: '2015-09-10',
    //     viewAd: '查看',
    //     isDisableModify: false,
    //     isDisableDelete: false,
    //     isDisableCancel: false,
    //     isDisableOff: true,
    //     isDisableRe: false
    //   },
    //   {
    //     adId: '893729872942',
    //     adTitle: '保姆招聘',
    //     adState: '审核未通过',
    //     stateClass: 'jx-notPass',
    //     createDate: '2015-01-01',
    //     viewAd: '查看',
    //     isDisableModify: false,
    //     isDisableDelete: true,
    //     isDisableCancel: false,
    //     isDisableOff: false,
    //     isDisableRe: true
    //   },
    //   {
    //     adId: '893729872943',
    //     adTitle: '公益广告',
    //     adState: '投放中',
    //     stateClass: 'jx-putting',
    //     createDate: '2015-09-10',
    //     viewAd: '查看',
    //     isDisableModify: false,
    //     isDisableDelete: false,
    //     isDisableCancel: false,
    //     isDisableOff: true,
    //     isDisableRe: false
    //   },
    //   {
    //     adId: '893729872944',
    //     adTitle: '房屋出租',
    //     adState: '结束投放',
    //     stateClass: 'jx-putEnd',
    //     createDate: '2015-12-30',
    //     viewAd: '查看',
    //     isDisableModify: false,
    //     isDisableDelete: false,
    //     isDisableCancel: false,
    //     isDisableOff: true,
    //     isDisableRe: false
    //   }
    // ];
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