/**
 * Created by Li on 2016/3/29.
 */
(function () {
  'use strict';
  angular
    .module('mad')
    .controller('NotificationCtrl', NotificationCtrl);

  function NotificationCtrl($scope) {

    $scope.notificationContents = [
      {
        avatar : "assets/images/avatar.jpg",
        msgTitle : '系统消息',
        msgBody : '您的广告123242903890已经通过审核，可以进行修改'
      },
      {
        avatar : "assets/images/avatar.jpg",
        msgTitle : '系统消息',
        msgBody : '您的广告123242903890已经通过审核，可以进行修改'
      }
    ];
  }

})();
