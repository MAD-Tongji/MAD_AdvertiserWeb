(function() {
  'use strict';

  angular
    .module('mad')
    .factory('TokenSrv', TokenSrv);

  /** @ngInject */
  function TokenSrv() {
    return {
          token: '6e777a9556c6774e6b62ff9a18ec456e3f05181260cf1a129811a4a08152fbaa',//
          setToken: function (token) {
              this.token = token;
          },
          getToken: function () {
              return this.token;
          }
        };
  }
})();
