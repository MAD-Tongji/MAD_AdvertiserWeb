(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AccountRechargeCtrl', AccountRechargeCtrl);

  function AccountRechargeCtrl($scope, $http, AdvertiserSrv) {

    $scope.checkbox = {
      trueValue : true
    };

    // 显示余额
    $scope.getBalance = function getBalance() {
      $('#balance-btn').hide();
      $('#balance-label').show();
    };

    // 广告商账户信息展示
    // TODO:广告商头像
    AdvertiserSrv.getAccountDetails().get().$promise.then(function(response) {
      if (response.errCode === 0) {
        $scope.alipay = response.advertiser.alipay;
        $scope.email = response.advertiser.email;
        $scope.name = response.advertiser.name;
        $scope.balance = response.advertiser.balance;
      }
    });

    // 显示账户充值二维码
    $scope.recharge = function (account, amount) {
      if(account == null || amount == null) {
        $scope.thereIsError = true;
        $scope.errMessage = '请输入完整信息';
      } else {
        $scope.thereIsError = false;
        // 根据amount显示modal图片
        console.log(amount);
        // TODO: 把图片换个地方放,这个网加载太慢
        switch (amount) {
          case "50":
            $scope.qrCodeImage = "http://cl.ly/3v2O3L0E0y2m/50.jpg";
            break;
          case "100":
            $scope.qrCodeImage = "http://cl.ly/0Q0e2b2l2H3e/100.jpg";
            break;
          case "200":
            $scope.qrCodeImage = "http://cl.ly/0N12001O3o2V/200.jpg";
            break;
          case "500":
            $scope.qrCodeImage = "http://cl.ly/2r0M2y2n0G1g/500.jpg";
            break;
          default :
        }
        $('#qrCodeModal').modal('show');
      }
    };

    // 充值申请
    $scope.rechargeFinish = function(account, amount) {
      AdvertiserSrv.recharge().save({
        recharge: amount,
        Alipay: account
      }).$promise.then(
        function (response) {
          console.log(response);
          if (0 == response.errCode) {
            console.log('充值申请成功');
            $('#qrCodeModal').modal('hide');
            $('#successModal').modal('show');
            // TODO: 刷新下面表格内容
          } else {
            // 错误处理
            $scope.thereIsError = true;
            $scope.errMessage = '未知错误:' + response.errCode;
          }
        }, function (error) {
          console.log('充值失败');
          console.log(error);
          $scope.thereIsError = true;
          $scope.errMessage = '未知错误:' + error;
        }
      );
    };

    //TODO: 下方充值记录表格
  }
})();
