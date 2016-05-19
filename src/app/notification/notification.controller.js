/**
 * Created by Li on 2016/3/29.
 */
(function () {
  'use strict';
  angular
    .module('mad')
    .controller('NotificationCtrl', NotificationCtrl);

  function NotificationCtrl($scope, AdvertiserSrv) {
    var list;

    AdvertiserSrv.getMessages().get().$promise.then(function(response) {
      if (response.errCode === 0) {
        // console.log(response.messages);
        list = response.messages;
        list.forEach(function (message) {
          message.date = AdvertiserSrv.parseDateFromStr(message.date);
        });
        list.sort(function (a, b) {
            return b.date.getTime() - a.date.getTime();
        });
        list.forEach(function (message) {
          message.date = AdvertiserSrv.formatDate(message.date);
        });

        $scope.notificationContents = list;
      }
    });
  }

})();
