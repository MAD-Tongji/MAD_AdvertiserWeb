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
        templateUrl: 'app/push-ad/push-ad.html',
        controller: 'PushAdController',
        controllerAs: 'push-ad'
      })
      .state('refund', {
          url: '/refund',
          templateUrl: 'app/refund/refund.html',
          controller: 'RefundController',
          controllerAs: 'refund'
      })
      .state('recharge', {
          url: '/recharge',
          templateUrl: 'app/recharge/recharge.html',
          controller: 'RechargeController',
          controllerAs: 'recharge'
      })
      .state('msg-notification', {
          url: '/msg-notification',
          templateUrl: 'app/msg-notification/msg-notification.html',
          controller: 'MsgNoticeController',
          controllerAs: 'msg-notification'
      })
      .state('check-account', {
          url: '/ck-account',
          templateUrl: 'app/check-account/check-account.html',
          controller: 'CheckAccountController',
          controllerAs: 'msg-notification'
    });
    $urlRouterProvider.otherwise('/');
  }

})();
