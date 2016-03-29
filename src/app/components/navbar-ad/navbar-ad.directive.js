/**
 * Created by JiXiang on 2016/3/28.
 */
(function() {
  'use strict';

  angular
    .module('mad')
    .directive('acmeNavbarAd', acmeNavbarAd);

  /** @ngInject */
  function acmeNavbarAd() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar-ad/navbar-ad.html',
      scope: {
        creationDate: '='
      },
      controller: NavbarAdController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarAdController($scope) {
      
    }
  }

})();
