(function() {
  'use strict';

  angular
    .module('mad')
    .factory('TokenSrv', TokenSrv);

  /** @ngInject */
  function TokenSrv() {
    return {
          token: 'a96ff26be4ff8ac213636aa9c1a943b9c96e3ff4c03d87d87074d289926bf8cb',//
          setToken: function (token) {
              this.token = token;
          },
          getToken: function () {
              return this.token;
          }
        };
  }
})();
