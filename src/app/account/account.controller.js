(function() {
  'use strict';
  angular
    .module('mad')
    .controller('AccountCtrl', AccountCtrl);

  /** @ngInject */
  function AccountCtrl($scope, $http) {
    angular.module('tabsDemoDynamicHeight', ['ngMaterial']);
  }
})();


