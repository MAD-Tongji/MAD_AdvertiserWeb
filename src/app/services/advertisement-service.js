(function() {
  'use strict';

  angular
    .module('mad')
    .service('AdvertisementSrv', AdvertisementSrv);

  /** @ngInject */
  function AdvertisementSrv($resource, baseURL) {

    this.advertTypes = [{
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

    this.types = {
      'other': '其他',
      'accommodation': '食宿',
      'commodity': '商品',
      'education': '教育',
      'entertainment': '影视娱乐',
      'recruit': '招聘',
      'service': '服务',
      'social': '社交',
      'tenancy': '租赁'
    };



    this.advertCities = [{
      id: 'Shanghai',
      city: '上海'
    }];


    this.getReleaseAdvertisement = function () {
        return $resource(baseURL + '/advertisement/list/all');
    };

    this.saveDraftAdvertisement = function () {
        return $resource(baseURL + '/advertisement/save');
    };

    this.getAdvertisementById = function () {
        return $resource(baseURL + '/advertisement/:advertId', {
          advertId: 'advertId'
        });
    };

    this.submitAdvertisementById = function () {
        return $resource(baseURL + '/advertisement/release');
    };

    this.getDistrictsByCity = function () {
        return $resource(baseURL + '/advertisement/district/all');
    };

    this.removeAdvertisementById = function () {
        return $resource(baseURL + '/advertisement/remove');
    };

    this.

    this.parseAdvertisement = function (advertisement, i) {
        advertisement.number = i;
        var state = '未知'
        advertisement.catalog = this.types[advertisement.catalog];
        if (advertisement.status === '001') {
          state = '正常投放';
          advertisement.isDisableOff = true;
        } else if (advertisement.status === '010') {
          state = '草稿';
          advertisement.canSubmit = true;
          advertisement.isDisableModify = true;
        } else if (advertisement.status === '100') {
          state = '待审核';
          advertisement.isDisableCancel = true;
          advertisement.canCancel = true;
        } else if (advertisement.status === '000') {
          state = '审核未通过';
          advertisement.isDisableModify = true;
        } else if (advertisement.status === '101') {
          state = '广告被下架';
          addEventListener.isDisableModify = true;
        }
        advertisement.state = state;

        return advertisement;
    };

    this.formatAdvertisement = function (advertisement) {
      advertisement.city = 'Shanghai';

      // format date
      var startDay = moment(advertisement.startDate).toDate();
      var endDay = moment(advertisement.endDate).toDate();

      advertisement.startDate = startDay;
      advertisement.endDate = endDay;

      return advertisement;
    };

    this.parseDate = function (date) {
      var momentDate = moment(date);
      return momentDate.format('YYYY-MM-DD HH:mm:ss');
    }
  }
})();
