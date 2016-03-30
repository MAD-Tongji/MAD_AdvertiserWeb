/**
 * Created by LENOVO on 2016/3/29.
 */
(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AdListController', AdListController);

  function AdListController($scope) {
    $scope.adList = [{
      adId: '893729872939',
      adTitle: '家教招聘',
      adState: '草稿',
      stateClass: '',
      createDate: '2015-01-01',
      viewAd: '查看',
      isDisableModify: true,
      isDisableDelete: true,
      isDisableCancel: false,
      isDisableOff: false,
      isDisableRe: false
      },
      {
        adId: '893729872940',
        adTitle: '厨师招聘',
        adState: '审核中',
        stateClass: '',
        createDate: '2015-03-17',
        viewAd: '查看',
        isDisableModify: false,
        isDisableDelete: false,
        isDisableCancel: true,
        isDisableOff: false,
        isDisableRe: false
      },
      {
        adId: '893729872941',
        adTitle: '老师招聘',
        adState: '审核已通过',
        stateClass: '',
        createDate: '2015-04-05',
        viewAd: '查看',
        isDisableModify: false,
        isDisableDelete: false,
        isDisableCancel: false,
        isDisableOff: true,
        isDisableRe: false
      },
      {
        adId: '893729872942',
        adTitle: '保姆招聘',
        adState: '审核未通过',
        stateClass: 'jx-notPass',
        createDate: '2015-01-01',
        viewAd: '查看',
        isDisableModify: false,
        isDisableDelete: true,
        isDisableCancel: false,
        isDisableOff: false,
        isDisableRe: true
      },
      {
        adId: '893729872943',
        adTitle: '公益广告',
        adState: '投放中',
        stateClass: 'jx-putting',
        createDate: '2015-09-10',
        viewAd: '查看',
        isDisableModify: false,
        isDisableDelete: false,
        isDisableCancel: false,
        isDisableOff: true,
        isDisableRe: false
      },
      {
        adId: '893729872944',
        adTitle: '房屋出租',
        adState: '结束投放',
        stateClass: 'jx-putEnd',
        createDate: '2015-12-30',
        viewAd: '查看',
        isDisableModify: false,
        isDisableDelete: false,
        isDisableCancel: false,
        isDisableOff: true,
        isDisableRe: false
      }
    ];
  }
})();
