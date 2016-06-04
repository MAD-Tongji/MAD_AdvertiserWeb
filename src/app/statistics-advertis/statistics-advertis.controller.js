/**
 * Created by Teng on 2016/4/10.
 */
(function () {
  'use strict';
  angular
    .module('mad')
    .controller('SatisticsAdvertMapCtrl', SatisticsAdvertMapCtrl);

  function SatisticsAdvertMapCtrl($scope, StatisticsSrv) {

    function dateExist(array, date) {
      var i;
      for (i = 0; i < array.length; i += 1) {
        if (array[i].date.getTime() === date.getTime()) {
          return i;
        }
      }
    }

    function generateChartData(rawData) {
      var chartData = [];
      var index, advertData, element;
      var i = 0, j = 0;

      for (i = 0; i < 3; i += 1) {
        advertData = rawData[i].data;

        for (j = 0; j < advertData.length; j += 1) {

          index = dateExist(chartData, advertData[j].date);
          if (index === undefined) {
            element = {
              'date': advertData[j].date,
              'advert1': 0,
              'advert2': 0,
              'advert3': 0
            };
            if (i === 0) {
              element.advert1 = advertData[j].num;
            } else if (i === 1) {
              element.advert2 = advertData[j].num;
            } else if (i === 2) {
              element.advert3 = advertData[j].num;
            }
            chartData.push(element);
          } else {
            if (i === 0) {
              chartData[index].advert1 = advertData[j].num;
            } else if (i === 1) {
              chartData[index].advert2 = advertData[j].num;
            } else if (i === 2) {
              chartData[index].advert3 = advertData[j].num;
            }
          }
        }
      }
      chartData.sort(function (a, b) {
        return a.date.getTime() - b.date.getTime();
      });

      return chartData;
    }


    StatisticsSrv.getStatisticsData().get().$promise
      .then(function (response) {
          if (0 === response.errCode) {
            // 该广告商所有广告投放数据
            // console.log('response');
            // console.log(response.advertisement);

            var broadcastData = [];
            var costData = [];
            var i = 0;
            var j = 0;

            var element;
            for (i = 0; i < response.advertisement.length; i += 1) {
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

              for (j = 0; j < element.statistics.length; j += 1) {
                broadcastData[i].sum += element.statistics[j].totalBroadcast;
                broadcastData[i].data.push({
                  'date': moment(element.statistics[j].date).toDate(),
                  'num': element.statistics[j].totalBroadcast
                });

                costData[i].sum += element.statistics[j].totalPrice;
                costData[i].data.push({
                  'date': moment(element.statistics[j].date).toDate(),
                  'num': element.statistics[j].totalPrice
                });
              }
            }
            broadcastData.sort(function (a, b) {
              return b.sum - a.sum;
            });
            costData.sort(function (a, b) {
              return b.sum - a.sum;
            });
            // console.log(broadcastData);
            // console.log(costData);

            // 取投放量最高的前三名
            var chart1Data = [];
            var chart2Data = [];
            var advertData;
            var index;
            if (broadcastData.length > 2) {
              var chart1Data = generateChartData(broadcastData);

              console.log('chart1Data');
              console.log(chart1Data);

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
                      "title": broadcastData[0].id,
                      "useLineColorForBulletBorder": true,
                      "valueField": "advert1",
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
                      "valueField": "advert2",
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
                      "title": "advertisment3",
                      "useLineColorForBulletBorder": true,
                      "valueField": "advert3",
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
                  "dataProvider": chart1Data
              });
            } else {
              // 有几个取几个
            }

            if (costData.length > 2) {
              var chart2Data = generateChartData(costData);

              var chart = AmCharts.makeChart("advertisment-chart", {
                  "type": "serial",
                  "theme": "light",
                  "legend": {
                      "useGraphSettings": true
                  },
                  "dataProvider": chart2Data,
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
                      "title": costData[0].id,
                      "valueField": "advert1",
                      "fillAlphas": 0
                  }, {
                      "valueAxis": "v2",
                      "lineColor": "#FCD202",
                      "bullet": "square",
                      "bulletBorderThickness": 1,
                      "hideBulletsCount": 30,
                      "title": costData[1].id,
                      "valueField": "advert2",
                      "fillAlphas": 0
                  }, {
                      "valueAxis": "v3",
                      "lineColor": "#B0DE09",
                      "bullet": "triangleUp",
                      "bulletBorderThickness": 1,
                      "hideBulletsCount": 30,
                      "title": costData[2].id,
                      "valueField": "advert3",
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
            } else {
              // 有几个取几个
            }
          }
      }).catch(function (error) {
          console.log(error);
      });
  }
})();
