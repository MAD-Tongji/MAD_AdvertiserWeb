(function () {
  'use strict';
  angular
    .module('mad')
    .controller('LoginController', LoginController);

  function LoginController($scope, $http) {
    $scope.loginInfo = {
      email: '',
      password: ''

    };

    $scope.postFormData = function () {
      $http({
        method: 'POST',
        url: '',
        data: $.param($scope.loginInfo)
      })
        .success(function(data, status, headers, config) {

        })
        .error(function (data, status, headers, config) {

        });
    };
  }


})();
