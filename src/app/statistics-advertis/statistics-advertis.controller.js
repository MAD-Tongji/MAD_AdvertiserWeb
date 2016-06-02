/**
 * Created by Teng on 2016/4/10.
 */
(function () {
  'use strict';
  angular
    .module('mad')
    .controller('SatisticsAdvertMapCtrl', SatisticsAdvertMapCtrl);

  function SatisticsAdvertMapCtrl($scope, StatisticsSrv) {
      StatisticsSrv.getStatisticsData().get().$promise
        .then(function (response) {
            if (0 === response.errCode) {
              // 该广告商所有广告投放数据
              // console.log(response.advertisement);

              var broadcastData = [];
              var costData = [];


              var element;
              for (var i = 0; i < response.advertisement.length; i += 1) {
                element = response.advertisement[i];
                broadcastData[i] = {
                  'id': element.id,
                  'data': [],
                  'sum': 0
                };

                costData[i] = {
                  'id': element.id,
                  'data': [],
                  'sum': 0
                }

                for (var j = 0; j < element.statistics.length; j += 1) {
                  broadcastData[i].sum += element.statistics[j].totalBroadcast;
                  broadcastData[i].data.push({
                    'date': moment(element.statistics[j].date).toDate(),
                    'broadcast': element.statistics[j].totalBroadcast
                  });

                  costData[i].sum += element.statistics[j].totalPrice;
                  costData[i].data.push({
                    'date': moment(element.statistics[j].date).toDate(),
                    'broadcast': element.statistics[j].totalPrice
                  });
                }
              }
              broadcastData.sort(function (a, b) {
                return b.sum - a.sum;
              });
              costData.sort(function (a, b) {
                return b.sum - a.sum;
              });
              console.log(broadcastData);
              console.log(costData);

              // 取最高的前三名
              // var advert1;
              // var advert2;
              // var advert3;
              // if (broadcastData.length > 2) {
              //   advert1 = broadcastData[1];
              //   advert2 = broadcastData[2];
              //   advert3 = broadcastData[3];
              // } else {
              //   broadcastData.forEach(function (advert) {
              //
              //   })
              // }

            }
        }, function (error) {
            console.log(error);
        });





        var advertisChartData = generateChartData();
        // console.log(advertisChartData);

    var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "light",
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "mouseWheelZoomEnabled":true,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            "id": "v1",
            "axisAlpha": 0,
            "position": "left",
            "ignoreAxisWidth":true
        }],
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "graphs": [{
                "id": "g1",
                "balloon":{
                "drop":true,
                "adjustBorderColor":false,
                "color":"#ffffff"
            },
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "advertisment1",
            "useLineColorForBulletBorder": true,
            "valueField": "value",
            "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        },
        {
            "id": "g2",
            "balloon":{
            "drop":true,
            "adjustBorderColor":false,
            "color":"#ffffff"
            },
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "advertisment2",
            "useLineColorForBulletBorder": true,
            "valueField": "hits",
            "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        },
        {
            "id": "g3",
            "balloon":{
            "drop":true,
            "adjustBorderColor":false,
            "color":"#ffffff"
            },
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "advertisment2",
            "useLineColorForBulletBorder": true,
            "valueField": "views",
            "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        }],
        "chartScrollbar": {
            "graph": "g1",
            "oppositeAxis":false,
            "offset":30,
            "scrollbarHeight": 80,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount":true,
            "color":"#AAAAAA"
        },
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#258cbb",
            "limitToGraph":"g1",
            "valueLineAlpha":0.2
        },
        "valueScrollbar":{
        "oppositeAxis":false,
        "offset":50,
        "scrollbarHeight":10
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true
        },
        "dataProvider": advertisChartData
    });

    chart.addListener("rendered", zoomChart);

    zoomChart();

    function zoomChart() {
        chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
    }

    var chart = AmCharts.makeChart("advertisment-chart", {
        "type": "serial",
        "theme": "light",
        "legend": {
            "useGraphSettings": true
        },
        "dataProvider": advertisChartData,
        "valueAxes": [{
            "id":"v1",
            "axisColor": "#FF6600",
            "axisThickness": 2,
            "gridAlpha": 0,
            "axisAlpha": 1,
            "position": "left"
        }, {
            "id":"v2",
            "axisColor": "#FCD202",
            "axisThickness": 2,
            "gridAlpha": 0,
            "axisAlpha": 1,
            "position": "right"
        }, {
            "id":"v3",
            "axisColor": "#B0DE09",
            "axisThickness": 2,
            "gridAlpha": 0,
            "offset": 50,
            "axisAlpha": 1,
            "position": "left"
        }],
        "graphs": [{
            "valueAxis": "v1",
            "lineColor": "#FF6600",
            "bullet": "round",
            "bulletBorderThickness": 1,
            "hideBulletsCount": 30,
            "title": "advertisment1",
            "valueField": "visits",
            "fillAlphas": 0
        }, {
            "valueAxis": "v2",
            "lineColor": "#FCD202",
            "bullet": "square",
            "bulletBorderThickness": 1,
            "hideBulletsCount": 30,
            "title": "advertisment2",
            "valueField": "hits",
            "fillAlphas": 0
        }, {
            "valueAxis": "v3",
            "lineColor": "#B0DE09",
            "bullet": "triangleUp",
            "bulletBorderThickness": 1,
            "hideBulletsCount": 30,
            "title": "advertisment3",
            "valueField": "views",
            "fillAlphas": 0
        }],
        "chartScrollbar": {},
        "chartCursor": {
            "cursorPosition": "mouse"
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "axisColor": "#DADADA",
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true,
            "position": "bottom-right"
        }
    });

    chart.addListener("dataUpdated", zoomChart);
    zoomChart();


    // generate some random data, quite different range
    function generateChartData() {
        var chartData = [];
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 100);

        for (var i = 0; i < 100; i++) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);

            var visits = Math.round(Math.random() * 40) + 100;
            var hits = Math.round(Math.random() * 80) + 500;
            var views = Math.round(Math.random() * 6000);

            chartData.push({
                date: newDate,
                visits: visits,
                value: visits,
                hits: hits,
                views: views
            });
        }
        return chartData;
    }

    function zoomChart(){
        chart.zoomToIndexes(chart.dataProvider.length - 20, chart.dataProvider.length - 1);
    }



  }
})();
