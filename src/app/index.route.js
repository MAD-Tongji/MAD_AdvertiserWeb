(function() {
  'use strict';

  angular
    .module('mad')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'signup'
      })
      .state('push-ad', {
        url: '/push-ad',
        templateUrl: 'app/ad-manage/push-ad/push-ad.html',
        controller: 'PushAdController',
        controllerAs: 'push-ad'
      })
      .state('ad-list', {
        url: '/ad-list',
        templateUrl: 'app/ad-manage/ad-list/ad-list.html',
        controller: 'AdListController',
        controllerAs: 'ad-list'
      })
      .state('ad-statistics', {
        url: '/ad-statistics',
        templateUrl: 'app/statistics/ad-statistics/ad-statistics.html',
        controller: 'AdStaController',
        controllerAs: 'ad-sta'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
