(function() {
  'use strict';

  angular
    .module('mad')
    .service('AdvertisementSrv', AdvertisementSrv);

  /** @ngInject */
  function AdvertisementSrv($resource, baseURL) {
    this.getReleaseAdvertisement = function () {
        return $resource(baseURL + '/advertisement/list/all');
    };
    
    this.saveNewAdvertisementToDraft = function () {
        return $resource(baseURL + '/');
    };
    
    this.getAdvertisementById = function () {
        return $resource(baseURL + '/');
    }
    
    this.parseAdvertisement = function (advertisement, i) {
        // advertisement.id = i;
        var state = '未知'
        
        if (advertisement.status === '001') {
          state = '正常投放';
          advertisement.isDisableOff = true;
        } else if (advertisement.status === '010') {
          state = '草稿';
          advertisement.canSubmit = true;
          advertisement.isDisableModify = true;
        } else if (advertisement.status === '100') {
          state = '未审核';
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
    }
  }
})();
