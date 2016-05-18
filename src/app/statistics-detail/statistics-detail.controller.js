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
                console.log(response.statistics);
            }
        }, function (error) {
            console.log(error);
        });
        
      var chartData = generateChartData();

    var chart = AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "light",
      "marginRight": 80,
      "dataProvider": chartData,
      "valueAxes": [{
        "position": "left",
        "title": "广告支出"
      }],
      "graphs": [{
        "id": "g1",
        "fillAlphas": 0.4,
        "valueField": "visits",
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
        "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
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

    chart.addListener("dataUpdated", zoomChart);
// when we apply theme, the dataUpdated event is fired even before we add listener, so
// we need to call zoomChart here
    zoomChart();
// this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
      // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
      chart.zoomToIndexes(chartData.length - 250, chartData.length - 100);
    }

// generate some random data, quite different range
    function generateChartData() {
      var chartData = [];
      // current date
      var firstDate = new Date();
      // now set 500 minutes back
      firstDate.setMinutes(firstDate.getDate() - 1000);

      // and generate 500 data items
      for (var i = 0; i < 500; i++) {
        var newDate = new Date(firstDate);
        // each time we add one minute
        newDate.setMinutes(newDate.getMinutes() + i);
        // some random number
        var visits = Math.round(Math.random() * 40 + 10 + i + Math.random() * i / 5);
        // add data item to the array
        chartData.push({
          date: newDate,
          visits: visits
        });
      }
      return chartData;
    }
  }
})();
