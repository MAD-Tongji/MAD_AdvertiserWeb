(function() {
  'use strict';

  angular
    .module('mad')
    .service('AdvertiserSrv', AdvertiserSrv);

  /** @ngInject */
  function AdvertiserSrv($resource, baseURL) {
    
    this.applyState = {
      '01': '申请等待处理',
      '00': '申请被拒绝',
      '11': '申请通过'
    }
    
    
    this.register = function () {
        return $resource(baseURL + '/signup');
    };

    this.login = function () {
        return $resource(baseURL + '/login');
    };

    this.checkInfo = function () {
        return $resource(baseURL + '/account/check');
    };

    this.formatCheckInfo = function (data) {

      if (data.businessPeriodIsLong) {
        data.businessPeriod = '长期';
      } else {
        var day = moment(data.businessPeriod);
        data.businessPeriodStr = day.format('YYYY-MM-DD HH:mm:ss');
        
      }
      
      if (data.legalPersonIdIsLong) {
        data.legalPersonValidDateStr = '长期';
      } else {
        day = moment(data.legalPersonValidDate);
        data.legalPersonValidDateStr = day.format('YYYY-MM-DD HH:mm:ss');
      }
      
      return data;
    };
    
    this.parseCheckInfo = function (data) {
      // 单位所在地，营业期限
      // 省份证有效期
      // 填写人身份
      data.companyLocationProvince = data.location.split(',')[0];
      data.companyLocationDistrict = data.location.split(',')[1];
      var day;
      if (!data.legalPerson.iflongterm) {
        day = moment(data.businessPeriod);
        data.periodDate = day.toDate();
      } 
      
      if (!data.periodIsLong) {
        day = moment(data.legalPerson.validDate);
        data.legalPerson.idValidDate = day.toDate();
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

    this.changePassword = function () {
      return $resource(baseURL + '/account/changePwd')
    };

    this.changeAlipay = function () {
      return $resource(baseURL + '/account/changeAlipay')
    };
    
    this.getCheckDetail = function () {
      return $resource(baseURL + '/account/check/detail')
    }
  }
})();
