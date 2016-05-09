(function() {
  'use strict';
  angular
    .module('mad')
    .controller('AccountCheckCtrl', AccountCheckCtrl);

    /** @ngInject */
  function AccountCheckCtrl($scope, AdvertiserSrv) {
    $scope.submit = function () {
      // 输入检查
      if (!$scope.detail || !checkInfoValid($scope.detail)) {
        console.log('输入检查');
        console.log($scope.detail);
        return;
      }
      
      // 格式化数据
      var detail = AdvertiserSrv.formatCheckInfo($scope.detail);
      console.log(detail);
      
      AdvertiserSrv.checkInfo().save({
        "detail": {
            "type": detail.companyType,
            "licenseType": detail.licenseType,
            "companyName": detail.companyName,
            "licenseCode": detail.licenseCode,
            "licenseImageUrl": 'http://img.jdzj.com/UserDocument/2013b/wuxibangyao/Picture/201372694821.jpg',
            "location": detail.companyLocationProvince + ',' + detail.companyLocationDistrict,
            "accomodation": detail.accomodation,
            "businessScope": detail.businessScope,
            "businessPeriod": detail.businessPeriodStr,
            "organizationCode": detail.organizationCode,
            "legalPerson": {
                "name": detail.legalPersonName,
                "location": detail.legalPersonLocation,
                "id": detail.legalPersonId,
                "validDate": detail.legalPersonValidDateStr,
                "iflongterm": detail.legalPersonIdIsLong,
                "iflegalperson": detail.legalPersonIflegalperson
            },
            "contactEmail": detail.contactEmail
        }
      }).$promise.then(
        function (response) {
          if (response.errCode === 0) {
            console.log('提交checkInfo成功');
            console.log(response);
          }
        }, function (error) {
          console.log('提交checkInfo失败');
          console.log(error);
        });
    }
  }
  
  function checkInfoValid(detail) {
    if (detail.accomodation && detail.businessPeriod 
      && detail.businessScope && detail.companyLocationDistrict 
      && detail.companyLocationProvince && detail.companyName 
      && detail.companyType && detail.contactEmail 
      && detail.legalPersonId && detail.legalPersonIflegalperson 
      && detail.legalPersonLocation && detail.legalPersonName 
      && detail.legalPersonValidDate && detail.licenseCode
      && detail.licenseType && detail.organizationCode) {
      return true;
    }
    return false;
  }
})();
