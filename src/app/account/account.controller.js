(function() {
  'use strict';
  angular
    .module('mad')
    .controller('AccountCtrl', AccountCtrl);

  /** @ngInject */
  function AccountCtrl($scope, AdvertiserSrv) {
    angular.module('tabsDemoDynamicHeight', ['ngMaterial']);
    //获取账户信息
    AdvertiserSrv.getAccountDetails().get().$promise.then(function(response) {
      if (response.errCode === 0) {
        $scope.alipay = response.advertiser.alipay;
        $scope.email = response.advertiser.email;
        $scope.name = response.advertiser.name;
        var status = response.advertiser.status;
        if (status === "010") { //未审核
          $scope.notVerified = true;
          $scope.isPassed = false;
          $scope.notPassed = false;
        } else if (status === "100") {
          $scope.notVerified = false;
          $scope.isPassed = true;
          $scope.notPassed = false;
        } else {
          $scope.notVerified = false;
          $scope.isPassed = false;
          $scope.notPassed = true;
        }
      }
    });
    //修改支付宝的接口
    $scope.changeAlipay = function (alipay) {
      //验证输入有效性
      if(alipay == null) {
        $scope.thereIsError = true;
        $scope.errMessage = '请输入完整信息';
        return;
      }
      if(alipay == $scope.alipay) {
        $scope.thereIsError = true;
        $scope.errMessage = '密码没有改变';
        return;
      }
      //输入有效
      $scope.thereIsError = false;
      //发送请求
      AdvertiserSrv.changeAlipay().save({
        Alipay: alipay
      }).$promise.then(
        function (response) {
          console.log(response);
          if (0 == response.errCode) {
            $scope.resultDetail = "您的支付宝账户名称更改成功";
            $('#successModal').modal('show');
          } else {
            // 错误处理
            $scope.thereIsError = true;
            $scope.errMessage = '未知错误:' + response.errCode;
          }
        }, function (error) {
          console.log('退款失败');
          console.log(error);
          $scope.thereIsError = true;
          $scope.errMessage = '未知错误:' + error;
        }
      );
    };
    //修改密码接口
    $scope.changePassword = function(oldPwd,newPwd,confirmPwd) {
      //验证输入有效性
      if(oldPwd == null || newPwd == null || confirmPwd == null) {
        $scope.confirmPwdError = true;
        $scope.confirmErrMsg = '请输入完整信息';
        return;
      }
      if(newPwd.length < 8) {
        $scope.newPwdError = true;
        $scope.newErrMsg = '密码必须大于等于8位';
        return;
      }
      if(confirmPwd != newPwd) {
        $scope.newPwdError = false;
        $scope.confirmPwdError = true;
        $scope.confirmErrMsg = '再次输入的密码不正确，请重新输入';
        return;
      }
      //输入有效
      $scope.confirmPwdError = false;
      $scope.newPwdError = false;
      //发送请求
      var oldPassSHA256 = sha256(oldPwd);
      var newPassSHA256 = sha256(newPwd);
      
      AdvertiserSrv.changePassword().save({
        oldPwd: oldPassSHA256,
        newPwd: newPassSHA256
      }).$promise.then(
        function (response) {
          console.log(response);
          if (0 == response.errCode) {
            $scope.oldPwdError = false;
            $scope.resultDetail = "您的密码修改成功";
            $('#successModal').modal('show');
            
          } else {
            // 错误处理
            if (305 == response.errCode) {
              $scope.oldPwdError = true;
              $scope.oldErrMsg = '旧密码错误，请重新输入';
            } else {
              $scope.confirmPwdError = true;
              $scope.confirmErrMsg = '未知错误:' + response.errCode;
            }
          }
        }, function (error) {
          $scope.confirmPwdError = true;
          $scope.confirmErrMsg = '未知错误:' + error;
        }
      );
    }
  }
})();


