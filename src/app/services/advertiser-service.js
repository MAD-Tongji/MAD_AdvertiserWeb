(function() {
  'use strict';

  angular
    .module('mad')
    .service('AdvertiserSrv', AdvertiserSrv);

  /** @ngInject */
  function AdvertiserSrv($resource, baseURL) {
    this.register = function () {
        return $resource(baseURL + '/signup');
    };

    this.login = function () {
        return $resource(baseURL + '/login');
    }
    
    this.checkInfo = function () {
        return $resource(baseURL + '/account/check');
    }
    
    this.formatCheckInfo = function (data) {
      
      if (data.businessPeriodIsLong) {
        data.businessPeriod = '长期';
      } else {
        var day = moment(data.businessPeriod);
        data.businessPeriodStr = day.format('YYYY-MM-DD HH:mm:ss');
        day = moment(data.legalPersonValidDate);
        data.legalPersonValidDateStr = day.format('YYYY-MM-DD HH:mm:ss');
      }
      
      return data;
    }

    this.getAccountDetails = function () {
      return $resource(baseURL + '/account/detail');
    };

    this.getMessages = function () {
      return $resource(baseURL + '/message');
    };

    this.recharge = function () {
      return $resource(baseURL + '/account/recharge');
    };

    this.refund = function () {
      return $resource(baseURL + '/account/refund');
    };

    this.getRechargeHistory = function () {
      return $resource(baseURL + '/account/recharge/all');
    };

    this.getRefundHistory = function () {
      return $resource(baseURL + '/account/refund/all');
    };
  }
})();
