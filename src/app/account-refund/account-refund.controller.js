(function () {
  'use strict';
  angular
    .module('mad')
    .controller('AccountRefundCtrl', AccountRefundCtrl);

  function AccountRefundCtrl($scope, NoticeSrv, AdvertiserSrv) {

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

    function getRefunds() {
      $scope.rowCollection = [];
      AdvertiserSrv.getRefundHistory().get().$promise.then(
        function (response) {
          var i = 0;
          var state = '';
          if (response.errCode === 0) {
            console.log('退款记录')
            console.log(response);
            for (i = 0; i < response.refundHistory.length; i++) {
              response.refundHistory[i].state = AdvertiserSrv.applyState[response.refundHistory[i].status];
              $scope.rowCollection.push(response.refundHistory[i]);
            }
          }
        }, function (error) {
          console.log('退款记录Error');
          console.log(error);
          NoticeSrv.error('退款申请提交失败');
        });
    }
    
    getRefunds();
    
    
    // 退款操作
    $scope.refund = function (amount, account) {
      if (!amount || !account) {
        // $scope.thereIsError = true;
        // $scope.errMessage = '';
        NoticeSrv.notice('请输入完整信息');
        return;
      }

      if (amount < 0) {
        // $scope.thereIsError = true;
        // $scope.errMessage = '';
        NoticeSrv.notice('请输入合法退款金额');
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
            // $('#successModal').modal('show');
            NoticeSrv.success('退款申请提交成功');
            getRefunds();
          } 
        }, function (error) {
          console.log('退款失败');
          console.log(error);
          // $scope.thereIsError = true;
          // $scope.errMessage = '未知错误:' + error;
          NoticeSrv.error('退款申请提交失败');
        }
      );
    }
  }
})();
