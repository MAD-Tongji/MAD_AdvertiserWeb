/**
 * Created by Li on 2016/3/29.
 */
(function () {
  'use strict';
  angular
    .module('mad')
    .controller('NotificationCtrl', NotificationCtrl);

  function NotificationCtrl($scope, AdvertiserSrv) {
    //TODO: 消息按照时间倒序排列
    AdvertiserSrv.getMessages().get().$promise.then(function(response) {
      if (response.errCode === 0) {
        console.log(response.messages);
        $scope.notificationContents = response.messages;
      }
    });
  }

})();
