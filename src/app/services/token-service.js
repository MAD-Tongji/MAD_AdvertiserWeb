(function() {
  'use strict';

  angular
    .module('mad')
    .factory('TokenSrv', TokenSrv);

  /** @ngInject */
  function TokenSrv() {
    return {
          token: '',//3c47bc088e99c3f962f6d0f3c0dd87c65222dd15cee709f137d6c47f703be303
          setToken: function (token) {
              this.token = token;
          },
          getToken: function () {
              return this.token;
          }
        };
  }
})();
