(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AccountRechargeCtrl', AccountRechargeCtrl);

// TODO: 列表的退款状态和充值状态应该显示中文


  function AccountRechargeCtrl($scope, NoticeSrv, AdvertiserSrv) {

    $scope.checkbox = {
      trueValue : true
    };

    // 显示余额
    $scope.getBalance = function getBalance() {
      $('#balance-btn').hide();
      $('#balance-label').show();
    };
    
    function getRecharges() {
      $scope.rowCollection = [];

      AdvertiserSrv.getRechargeHistory().get().$promise.then(
        function (response) {
          var i = 0;
          var state = '';
          if (response.errCode === 0) {
            console.log('充值记录')
            console.log(response);
            for (i = 0; i < response.rechargeHistory.length; i++) {
              // if (response.refundHistory[i].status) {
              //   state = '';
              // } else {
              //   state = '';
              // }
              $scope.rowCollection.push(response.rechargeHistory[i]);
            }
          }
        }, function (error) {
          console.log('充值记录Error');
          console.log(error);
        });
    }
    getRecharges();

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
      if(!account || !amount) {
        // $scope.thereIsError = true;
        // $scope.errMessage = '请输入完整信息';
        NoticeSrv.notice('请输入完整信息');
      } else {
        $scope.thereIsError = false;
        // 根据amount显示modal图片
        console.log(amount);
        switch (amount) {
          case "50":
            $scope.qrCodeImage = "http://mad-10035512.file.myqcloud.com/50.jpg";
            break;
          case "100":
            $scope.qrCodeImage = "http://mad-10035512.file.myqcloud.com/100.jpg";
            break;
          case "200":
            $scope.qrCodeImage = "http://mad-10035512.file.myqcloud.com/200.jpg";
            break;
          case "500":
            $scope.qrCodeImage = "http://mad-10035512.file.myqcloud.com/500.jpg";
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
            // $('#qrCodeModal').modal('hide');
            // $('#successModal').modal('show');
            NoticeSrv.success('充值成功');
            getRecharges();
          } 
        }, function (error) {
          console.log('充值失败');
          console.log(error);
          // $scope.thereIsError = true;
          // $scope.errMessage = '未知错误:' + error;
          NoticeSrv.error('充值失败');
        });
    };
  }
})();
