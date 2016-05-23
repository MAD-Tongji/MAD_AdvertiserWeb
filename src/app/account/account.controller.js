(function() {
  'use strict';
  angular
    .module('mad')
    .controller('AccountCtrl', AccountCtrl);

  /** @ngInject */
  function AccountCtrl($scope, $state, NoticeSrv, AdvertiserSrv) {
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
    }, function (error) {
      NoticeSrv.error('未能获取用户信息');
      console.log(error);
    });
    //修改支付宝的接口
    $scope.changeAlipay = function (alipay) {
      //验证输入有效性
      if(!alipay) {
        $scope.thereIsError = true;
        $scope.errMessage = '请输入完整信息';
        return;
      }
      if(alipay === $scope.alipay) {
        $scope.thereIsError = true;
        $scope.errMessage = '输入的支付宝账号与现在账号相同';
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
          if (0 === response.errCode) {
            $scope.resultDetail = "您的支付宝账户名称更改成功";
            $('#successModal').modal('show');
            $scope.alipay = alipay;
          }
          // else {
          //   // 错误处理
          //   $scope.thereIsError = true;
          //   $scope.errMessage = '未知错误:' + response.errCode;
          // }
        }, function (error) {
          NoticeSrv.error('未知错误');

          // $scope.thereIsError = true;
          // $scope.errMessage = '未知错误:' + error;
        }
      );
    };
    //修改密码接口
    $scope.changePassword = function(oldPwd,newPwd,confirmPwd) {
      //验证输入有效性
      if(newPwd.length < 8) {
        $scope.newPwdError = true;
        $scope.newErrMsg = '密码至少要8位';
        return;
      }

      $scope.newPwdError = false;

      if(!oldPwd || !newPwd || !confirmPwd) {
        $scope.confirmPwdError = true;
        $scope.confirmErrMsg = '请输入完整信息';
        return;
      }

      if(confirmPwd !== newPwd) {
        $scope.confirmPwdError = true;
        $scope.confirmErrMsg = '再次输入的密码不正确，请重新输入';
        return;
      }
      if(newPwd === oldPwd) {
        $scope.confirmPwdError = true;
        $scope.confirmErrMsg = '密码没有改变，请重新输入';
        return;
      }
      //输入有效
      $scope.confirmPwdError = false;

      //发送请求
      var oldPassSHA256 = sha256(oldPwd);
      var newPassSHA256 = sha256(newPwd);

      AdvertiserSrv.changePassword().save({
        oldPwd: oldPassSHA256,
        newPwd: newPassSHA256
      }).$promise.then(
        function (response) {
          console.log(response);
          if (0 === response.errCode) {
            $scope.oldPwdError = false;
            $scope.resultDetail = "您的密码修改成功";
            $('#successModal').modal('show');

          } else if (305 === response.errCode) {
            $scope.oldPwdError = true;
            $scope.oldErrMsg = '旧密码错误，请重新输入';
          }
          // else {
          //   // 错误处理
          //   if (305 == response.errCode) {
              // $scope.oldPwdError = true;
              // $scope.oldErrMsg = '旧密码错误，请重新输入';
          //   } else {
          //     $scope.confirmPwdError = true;
          //     $scope.confirmErrMsg = '未知错误:' + response.errCode;
          //   }
          // }
        }, function (error) {
          NoticeSrv.error('未知错误');
          // $scope.confirmPwdError = true;
          // $scope.confirmErrMsg = '未知错误:' + error;
        });
    };
  }
})();
