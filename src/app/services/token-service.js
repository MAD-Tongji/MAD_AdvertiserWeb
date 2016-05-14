(function() {
  'use strict';

  angular
    .module('mad')
    .factory('TokenSrv', TokenSrv);

  /** @ngInject */
  function TokenSrv($cookies) {
    return {
          token: '',// for test:6e777a9556c6774e6b62ff9a18ec456e3f05181260cf1a129811a4a08152fbaa
          name: '',
          setToken: function (token) {
              this.token = token;
              $cookies.put('token', token);
          },
          getToken: function () {
            if (!this.token) {
              this.token = $cookies.get('token');
            }
            return this.token;
          },
          setName: function(name) {
            this.name = name;
            $cookies.put('name', name);
          },
          getName: function() {
            if (!this.name) {
              this.name = $cookies.get('name');
            }
            return this.name;
          }
        };
  }
})();
