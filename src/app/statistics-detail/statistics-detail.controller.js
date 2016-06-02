/**
 * Created by LENOVO on 2016/3/29.
 */
(function () {
  'use strict';
  angular
    .module('mad')
    .controller('SatisticsDetailCtrl', SatisticsDetailCtrl);

      /** @ngInject */
  function SatisticsDetailCtrl($scope, $stateParams, StatisticsSrv) {

    $scope.advertId = $stateParams.advertId;
    StatisticsSrv.getAdvertDetail().get({
        id: $scope.advertId
      }).$promise.then(function (response) {
          if (0 === response.errCode) {
            console.log('statistics data:');
            console.log(response.statistics);

            // parse date
            response.statistics.forEach(function (data) {
              data.date = moment(data.date).toDate();
            });
            var chartData = response.statistics;

            var chart = AmCharts.makeChart("chartdiv", {
              "type": "serial",
              "theme": "light",
              "marginRight": 80,
              "dataProvider": response.statistics,
              "valueAxes": [{
                "position": "left",
                "title": "广告投放"
              }],
              "graphs": [{
                "id": "g1",
                "fillAlphas": 0.4,
                "valueField": "totalBroadcast",
                "balloonText": "<div style='margin:5px; font-size:19px;'>投放:<b>[[value]]</b></div>"
              }],
              "chartScrollbar": {
                "graph": "g1",
                "scrollbarHeight": 80,
                "backgroundAlpha": 0,
                "selectedBackgroundAlpha": 0.1,
                "selectedBackgroundColor": "#888888",
                "graphFillAlpha": 0,
                "graphLineAlpha": 0.5,
                "selectedGraphFillAlpha": 0,
                "selectedGraphLineAlpha": 1,
                "autoGridCount": true,
                "color": "#AAAAAA"
              },
              "chartCursor": {
                "categoryBalloonDateFormat": "DD MMMM",
                "cursorPosition": "mouse"
              },
              "categoryField": "date",
              "categoryAxis": {
                "minPeriod": "mm",
                "parseDates": true
              },
              "export": {
                "enabled": true
              }
            });
          }
      }, function (error) {
          console.log(error);
      });
  }
})();
