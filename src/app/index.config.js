(function() {
  'use strict';

  angular
    .module('mad')
    .config(config);

  /** @ngInject */
  function config($httpProvider, $logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);
    $httpProvider.interceptors.push('myInterceptor');

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

  //angular.module('mad').value('baseURL', 'http://121.42.57.59:4000/advertiser');
  angular.module('mad').value('baseURL', 'http://localhost:4000/advertiser');

})();
