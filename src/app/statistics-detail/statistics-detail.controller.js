/**
 * Created by LENOVO on 2016/3/29.
 */
(function () {
  'use strict';
  angular
    .module('mad')
    .controller('SatisticsDetailCtrl', SatisticsDetailCtrl);

  function SatisticsDetailCtrl($scope) {
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
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "value",
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
        "dataProvider": [{
            "date": "2014-07-27",
            "value": 13
        }, {
            "date": "2014-07-28",
            "value": 11
        }, {
            "date": "2014-07-29",
            "value": 15
        }, {
            "date": "2014-07-30",
            "value": 16
        }, {
            "date": "2014-07-31",
            "value": 18
        }, {
            "date": "2014-08-01",
            "value": 13
        }, {
            "date": "2014-08-02",
            "value": 22
        }, {
            "date": "2014-08-03",
            "value": 23
        }, {
            "date": "2014-08-04",
            "value": 20
        }, {
            "date": "2014-08-05",
            "value": 17
        }, {
            "date": "2014-08-06",
            "value": 16
        }, {
            "date": "2014-08-07",
            "value": 18
        }, {
            "date": "2014-08-08",
            "value": 21
        }, {
            "date": "2014-08-09",
            "value": 26
        }, {
            "date": "2014-08-10",
            "value": 24
        }, {
            "date": "2014-08-11",
            "value": 29
        }, {
            "date": "2014-08-12",
            "value": 32
        }, {
            "date": "2014-08-13",
            "value": 18
        }, {
            "date": "2014-08-14",
            "value": 24
        }, {
            "date": "2014-08-15",
            "value": 22
        }, {
            "date": "2014-08-16",
            "value": 18
        }, {
            "date": "2014-08-17",
            "value": 19
        }, {
            "date": "2014-08-18",
            "value": 14
        }, {
            "date": "2014-08-19",
            "value": 15
        }, {
            "date": "2014-08-20",
            "value": 12
        }, {
            "date": "2014-08-21",
            "value": 8
        }, {
            "date": "2014-08-22",
            "value": 9
        }, {
            "date": "2014-08-23",
            "value": 8
        }, {
            "date": "2014-08-24",
            "value": 7
        }, {
            "date": "2014-08-25",
            "value": 5
        }, {
            "date": "2014-08-26",
            "value": 11
        }, {
            "date": "2014-08-27",
            "value": 13
        }, {
            "date": "2014-08-28",
            "value": 18
        }, {
            "date": "2014-08-29",
            "value": 20
        }, {
            "date": "2014-08-30",
            "value": 29
        }, {
            "date": "2014-08-31",
            "value": 33
        }, {
            "date": "2014-09-01",
            "value": 42
        }, {
            "date": "2014-09-02",
            "value": 35
        }, {
            "date": "2014-09-03",
            "value": 31
        }, {
            "date": "2014-09-04",
            "value": 47
        }, {
            "date": "2014-09-05",
            "value": 52
        }, {
            "date": "2014-09-06",
            "value": 46
        }, {
            "date": "2014-09-07",
            "value": 41
        }, {
            "date": "2014-09-08",
            "value": 43
        }, {
            "date": "2014-09-09",
            "value": 40
        }, {
            "date": "2014-09-10",
            "value": 39
        }, {
            "date": "2014-09-11",
            "value": 34
        }, {
            "date": "2014-09-12",
            "value": 29
        }, {
            "date": "2014-09-13",
            "value": 34
        }, {
            "date": "2014-09-14",
            "value": 37
        }, {
            "date": "2014-09-15",
            "value": 42
        }, {
            "date": "2014-09-16",
            "value": 49
        }, {
            "date": "2014-09-17",
            "value": 46
        }, {
            "date": "2014-09-18",
            "value": 47
        }, {
            "date": "2014-09-19",
            "value": 55
        }, {
            "date": "2014-09-20",
            "value": 59
        }, {
            "date": "2014-09-21",
            "value": 58
        }, {
            "date": "2014-09-22",
            "value": 57
        }, {
            "date": "2014-09-23",
            "value": 61
        }, {
            "date": "2014-09-24",
            "value": 59
        }, {
            "date": "2014-09-25",
            "value": 67
        }, {
            "date": "2014-09-26",
            "value": 65
        }, {
            "date": "2014-09-27",
            "value": 61
        }, {
            "date": "2014-09-28",
            "value": 66
        }, {
            "date": "2014-09-29",
            "value": 69
        }, {
            "date": "2014-09-30",
            "value": 71
        }, {
            "date": "2014-10-01",
            "value": 67
        }, {
            "date": "2014-10-02",
            "value": 63
        }, {
            "date": "2014-10-03",
            "value": 46
        }, {
            "date": "2014-10-04",
            "value": 32
        }, {
            "date": "2014-10-05",
            "value": 21
        }, {
            "date": "2014-10-06",
            "value": 18
        }, {
            "date": "2014-10-07",
            "value": 21
        }, {
            "date": "2014-10-08",
            "value": 28
        }, {
            "date": "2014-10-09",
            "value": 27
        }, {
            "date": "2014-10-10",
            "value": 36
        }, {
            "date": "2014-10-11",
            "value": 33
        }, {
            "date": "2014-10-12",
            "value": 31
        }, {
            "date": "2014-10-13",
            "value": 30
        }, {
            "date": "2014-10-14",
            "value": 34
        }, {
            "date": "2014-10-15",
            "value": 38
        }, {
            "date": "2014-10-16",
            "value": 37
        }, {
            "date": "2014-10-17",
            "value": 44
        }, {
            "date": "2014-10-18",
            "value": 49
        }, {
            "date": "2014-10-19",
            "value": 53
        }, {
            "date": "2014-10-20",
            "value": 57
        }, {
            "date": "2014-10-21",
            "value": 60
        }, {
            "date": "2014-10-22",
            "value": 61
        }, {
            "date": "2014-10-23",
            "value": 69
        }, {
            "date": "2014-10-24",
            "value": 67
        }, {
            "date": "2014-10-25",
            "value": 72
        }, {
            "date": "2014-10-26",
            "value": 77
        }, {
            "date": "2014-10-27",
            "value": 75
        }, {
            "date": "2014-10-28",
            "value": 70
        }, {
            "date": "2014-10-29",
            "value": 72
        }, {
            "date": "2014-10-30",
            "value": 70
        }, {
            "date": "2014-10-31",
            "value": 72
        }, {
            "date": "2014-11-01",
            "value": 73
        }, {
            "date": "2014-11-02",
            "value": 67
        }, {
            "date": "2014-11-03",
            "value": 68
        }, {
            "date": "2014-11-04",
            "value": 65
        }, {
            "date": "2014-11-05",
            "value": 71
        }, {
            "date": "2014-11-06",
            "value": 75
        }, {
            "date": "2014-11-07",
            "value": 74
        }, {
            "date": "2014-11-08",
            "value": 71
        }, {
            "date": "2014-11-09",
            "value": 76
        }, {
            "date": "2014-11-10",
            "value": 77
        }, {
            "date": "2014-11-11",
            "value": 81
        }, {
            "date": "2014-11-12",
            "value": 83
        }, {
            "date": "2014-11-13",
            "value": 80
        }, {
            "date": "2014-11-14",
            "value": 81
        }, {
            "date": "2014-11-15",
            "value": 87
        }, {
            "date": "2014-11-16",
            "value": 82
        }, {
            "date": "2014-11-17",
            "value": 86
        }, {
            "date": "2014-11-18",
            "value": 80
        }, {
            "date": "2014-11-19",
            "value": 87
        }, {
            "date": "2014-11-20",
            "value": 83
        }, {
            "date": "2014-11-21",
            "value": 85
        }, {
            "date": "2014-11-22",
            "value": 84
        }, {
            "date": "2014-11-23",
            "value": 82
        }, {
            "date": "2014-11-24",
            "value": 73
        }, {
            "date": "2014-11-25",
            "value": 71
        }, {
            "date": "2014-11-26",
            "value": 75
        }, {
            "date": "2014-11-27",
            "value": 79
        }, {
            "date": "2014-11-28",
            "value": 70
        }, {
            "date": "2014-11-29",
            "value": 73
        }, {
            "date": "2014-11-30",
            "value": 61
        }, {
            "date": "2014-12-01",
            "value": 62
        }, {
            "date": "2014-12-02",
            "value": 66
        }, {
            "date": "2014-12-03",
            "value": 65
        }, {
            "date": "2014-12-04",
            "value": 73
        }, {
            "date": "2014-12-05",
            "value": 79
        }, {
            "date": "2014-12-06",
            "value": 78
        }, {
            "date": "2014-12-07",
            "value": 78
        }, {
            "date": "2014-12-08",
            "value": 78
        }, {
            "date": "2014-12-09",
            "value": 74
        }, {
            "date": "2014-12-10",
            "value": 73
        }, {
            "date": "2014-12-11",
            "value": 75
        }, {
            "date": "2014-12-12",
            "value": 70
        }, {
            "date": "2014-12-13",
            "value": 77
        }, {
            "date": "2014-12-14",
            "value": 67
        }, {
            "date": "2014-12-15",
            "value": 62
        }, {
            "date": "2014-12-16",
            "value": 64
        }, {
            "date": "2014-12-17",
            "value": 61
        }, {
            "date": "2014-12-18",
            "value": 59
        }, {
            "date": "2014-12-19",
            "value": 53
        }, {
            "date": "2014-12-20",
            "value": 54
        }, {
            "date": "2014-12-21",
            "value": 56
        }, {
            "date": "2014-12-22",
            "value": 59
        }, {
            "date": "2014-12-23",
            "value": 58
        }, {
            "date": "2014-12-24",
            "value": 55
        }, {
            "date": "2014-12-25",
            "value": 52
        }, {
            "date": "2014-12-26",
            "value": 54
        }, {
            "date": "2014-12-27",
            "value": 50
        }, {
            "date": "2014-12-28",
            "value": 50
        }, {
            "date": "2014-12-29",
            "value": 51
        }, {
            "date": "2014-12-30",
            "value": 52
        }, {
            "date": "2014-12-31",
            "value": 58
        }, {
            "date": "2015-01-01",
            "value": 60
        }, {
            "date": "2015-01-02",
            "value": 67
        }, {
            "date": "2015-01-03",
            "value": 64
        }, {
            "date": "2015-01-04",
            "value": 66
        }, {
            "date": "2015-01-05",
            "value": 60
        }, {
            "date": "2015-01-06",
            "value": 63
        }, {
            "date": "2015-01-07",
            "value": 61
        }, {
            "date": "2015-01-08",
            "value": 60
        }, {
            "date": "2015-01-09",
            "value": 65
        }, {
            "date": "2015-01-10",
            "value": 75
        }, {
            "date": "2015-01-11",
            "value": 77
        }, {
            "date": "2015-01-12",
            "value": 78
        }, {
            "date": "2015-01-13",
            "value": 70
        }, {
            "date": "2015-01-14",
            "value": 70
        }, {
            "date": "2015-01-15",
            "value": 73
        }, {
            "date": "2015-01-16",
            "value": 71
        }, {
            "date": "2015-01-17",
            "value": 74
        }, {
            "date": "2015-01-18",
            "value": 78
        }, {
            "date": "2015-01-19",
            "value": 85
        }, {
            "date": "2015-01-20",
            "value": 82
        }, {
            "date": "2015-01-21",
            "value": 83
        }, {
            "date": "2015-01-22",
            "value": 88
        }, {
            "date": "2015-01-23",
            "value": 85
        }, {
            "date": "2015-01-24",
            "value": 85
        }, {
            "date": "2015-01-25",
            "value": 80
        }, {
            "date": "2015-01-26",
            "value": 87
        }, {
            "date": "2015-01-27",
            "value": 84
        }, {
            "date": "2015-01-28",
            "value": 83
        }, {
            "date": "2015-01-29",
            "value": 84
        }, {
            "date": "2015-01-30",
            "value": 81
        }]
    });

    chart.addListener("rendered", zoomChart);

    var chartData = generateAdvertisChartData();

    var advertisChart = AmCharts.makeChart("advertisment-chart", {
        "type": "serial",
        "theme": "light",
        "legend": {
            "useGraphSettings": true
        },
        "dataProvider": chartData,
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
            "title": "advertisment 1",
            "valueField": "visits",
            "fillAlphas": 0
        }, {
            "valueAxis": "v2",
            "lineColor": "#FCD202",
            "bullet": "square",
            "bulletBorderThickness": 1,
            "hideBulletsCount": 30,
            "title": "advertisment 2",
            "valueField": "hits",
            "fillAlphas": 0
        }, {
            "valueAxis": "v3",
            "lineColor": "#B0DE09",
            "bullet": "triangleUp",
            "bulletBorderThickness": 1,
            "hideBulletsCount": 30,
            "title": "advertisment 3",
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

    advertisChart.addListener("dataUpdated", zoomChart);
    zoomChart();


    // generate some random data, quite different range
    function generateAdvertisChartData() {
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
                hits: hits,
                views: views
            });
        }
        return chartData;
    }

    function zoomChart(){
        chart.zoomToIndexes(advertisChart.dataProvider.length - 20, advertisChart.dataProvider.length - 1);
    }



  }


})();
