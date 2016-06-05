(function() {
  'use strict';

  angular
    .module('mad')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        url: '/',
        views: {
            'header': {
                templateUrl: 'app/components/navbar-advert/navbar-advert.html',
                controller: 'HeaderCtrl'
            },
            'content': {
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            },
            'footer': {
              templateUrl: 'app/components/footer-advert/footer-advert.html',
              controller: 'FooterCtrl'
            }
        }
      })
      .state('app.advert', {
        url: 'advert',
        views: {
            'content@': {
                templateUrl: 'app/advertisment/advertisment.html',
                controller: 'AdvertCtrl'
            }
        }
      })
      .state('app.advert.edit', {
        url: '/edit/:advertId',
        views: {
            'content@': {
                templateUrl: 'app/advert-edit/advert-edit.html',
                controller: 'AdvertEditCtrl'
            }
        }
      })
      .state('app.advert.detail', {
        url: '/detail/:advertId',
        views: {
            'content@': {
                templateUrl: 'app/advert-detail/advert-detail.html',
                controller: 'AdvertDetailCtrl'
            }
        }
      })
      .state('app.account', {
          url: 'account',
          views: {
              'content@': {
                  templateUrl: 'app/account/account.html',
                  controller: 'AccountCtrl'
              }
          }
      })
      .state('app.account.recharge', {
          url: '/recharge',
          views: {
              'content@': {
                  templateUrl: 'app/account-recharge/account-recharge.html',
                  controller: 'AccountRechargeCtrl'
              }
          }
      })
      .state('app.account.refund', {
          url: '/refund',
          views: {
              'content@': {
                  templateUrl: 'app/account-refund/account-refund.html',
                  controller: 'AccountRefundCtrl'
              }
          }
      })
      .state('app.account.check', {
          url: '/check',
          views: {
              'content@': {
                  templateUrl: 'app/account-check/account-check.html',
                  controller: 'AccountCheckCtrl'
              }
          }
      })
      .state('app.statistics', {
          url: 'statistics',
          views: {
              'content@': {
                  templateUrl: 'app/statistics/statistics.html',
                  controller: 'AdvertSatisticsCtrl'
              }
          }
      })
      .state('app.statistics.advertis', {
          url: '/advertis',
          views: {
              'content@': {
                  templateUrl: 'app/statistics-advertis/statistics-advertis.html',
                  controller: 'SatisticsAdvertMapCtrl'
              }
          }
      })
      .state('app.statistics.detail', {
          url: '/detail/:advertId',
          views: {
              'content@': {
                  templateUrl: 'app/statistics-detail/statistics-detail.html',
                  controller: 'SatisticsDetailCtrl'
              }
          }
      })
      .state('app.notification', {
          url: 'notification',
          views: {
              'content@': {
                  templateUrl: 'app/notification/notification.html',
                  controller: 'NotificationCtrl'
              }
          }
      })
      .state('app.pact', {
          url: 'pact',
          views: {
              'content@': {
                  templateUrl: 'app/pact/pact.html'
              }
          }
      });
  }

})();
