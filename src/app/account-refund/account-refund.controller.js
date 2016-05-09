(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AccountRefundCtrl', AccountRefundCtrl);

  function AccountRefundCtrl($scope, $http, AdvertiserSrv) {

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

    // 显示余额
    $scope.getBalance = function getBalance() {
      $('#balance-btn').hide();
      $('#balance-label').show();
    };

    // TODO:表格信息的填写
    $scope.rowCollection = [];
    AdvertiserSrv.getRefundHistory().get().$promise.then(
      function (response) {
        var i = 0;
        var state = '';
        if (response.errCode === 0) {
          console.log('退款记录')
          console.log(response);
          for (i = 0; i < response.refundHistory.length; i++) {
            // if (response.refundHistory[i].status) {
            //   state = '';
            // } else {
            //   state = '';
            // }
            $scope.rowCollection.push(response.refundHistory[i]);
          }
        }
      }, function (error) {
        console.log('退款记录Error');
        console.log(error);
      });

    // 退款操作
    $scope.refund = function (amount, account) {
      if (amount == null || account == null) {
        $scope.thereIsError = true;
        $scope.errMessage = '请输入完整信息';
        return;
      }

      if (amount < 0) {
        $scope.thereIsError = true;
        $scope.errMessage = '请输入合法退款金额';
        return;
      }

      $scope.thereIsError = false;
      AdvertiserSrv.refund().save({
        refund: amount,
        Alipay: account
      }).$promise.then(
        function (response) {
          console.log(response);
          if (0 == response.errCode) {
            console.log('退款申请成功');
            $('#successModal').modal('show');
            // TODO: 刷新下面表格内容
          } else {
            // 错误处理
            if (304 == response.errCode) {
              $scope.thereIsError = true;
              $scope.errMessage = '退款金额大于余额';
            } else {
              $scope.thereIsError = true;
              $scope.errMessage = '未知错误:' + response.errCode;
            }
          }
        }
        , function (error) {
          console.log('退款失败');
          console.log(error);
          $scope.thereIsError = true;
          $scope.errMessage = '未知错误:' + error;
        }
      );
    }
  }
})();
