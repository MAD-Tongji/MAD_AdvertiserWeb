/**
 * Created by LENOVO on 2016/3/29.
 */
(function() {
  var chart1 = AmCharts.makeChart("chartdiv1", {
    "theme": "light",
    "type": "serial",
    "dataProvider": [{
      "month": "Jan.",
      "year2004": 3.5,
      "year2005": 4.2
    }, {
      "month": "Feb.",
      "year2004": 1.7,
      "year2005": 3.1
    }, {
      "month": "Mar.",
      "year2004": 2.8,
      "year2005": 2.9
    }, {
      "month": "Apr.",
      "year2004": 2.6,
      "year2005": 2.3
    }, {
      "month": "May.",
      "year2004": 1.4,
      "year2005": 2.1
    }, {
      "month": "Jun.",
      "year2004": 2.6,
      "year2005": 4.9
    }, {
      "month": "Jul.",
      "year2004": 6.4,
      "year2005": 7.2
    }, {
      "month": "Aug.",
      "year2004": 8,
      "year2005": 7.1
    }, {
      "month": "Sep.",
      "year2004": 9.9,
      "year2005": 10.1
    }
      , {
        "month": "Oct.",
        "year2004": 5.9,
        "year2005": 7.1
      }
      , {
        "month": "Nov.",
        "year2004": 4.9,
        "year2005": 9.1
      }
      , {
        "month": "Dec.",
        "year2004": 7.9,
        "year2005": 12.6
      }],
    "valueAxes": [{
      "stackType": "3d",
      "unit": "千(元)",
      "position": "left",
      "title": "广告商月支出",
    }],
    "startDuration": 1,
    "graphs": [{
      "balloonText": "广告商月支出 (2014 [[category]]): <b>[[value]]</b>",
      "fillAlphas": 0.9,
      "lineAlpha": 0.2,
      "title": "2004",
      "type": "column",
      "valueField": "year2004"
    }, {
      "balloonText": "广告商月支出 (2015 [[category]]): <b>[[value]]</b>",
      "fillAlphas": 0.9,
      "lineAlpha": 0.2,
      "title": "2005",
      "type": "column",
      "valueField": "year2005"
    }],
    "plotAreaFillAlphas": 0.1,
    "depth3D": 10,
    "angle": 10,
    "categoryField": "month",
    "categoryAxis": {
      "gridPosition": "start"
    },
    "export": {
      "enabled": true
    }
  });

  var chart2 = AmCharts.makeChart("chartdiv2", {
    "theme": "light",
    "type": "serial",
    "dataProvider": [{
      "quarter": "第一季度",
      "year2004": 13.5,
      "year2005": 14.2
    }, {
      "quarter": "第二季度",
      "year2004": 11.7,
      "year2005": 13.1
    }, {
      "quarter": "第三季度",
      "year2004": 12.8,
      "year2005": 12.9
    }, {
      "quarter": "第四季度",
      "year2004": 12.6,
      "year2005": 12.8
    }],
    "valueAxes": [{
      "stackType": "3d",
      "unit": "千(元)",
      "position": "left",
      "title": "广告商季度支出",
    }],
    "startDuration": 1,
    "graphs": [{
      "balloonText": "广告商季度支出 (2014 [[category]]): <b>[[value]]</b>",
      "fillAlphas": 0.9,
      "lineAlpha": 0.2,
      "title": "2004",
      "type": "column",
      "valueField": "year2004"
    }, {
      "balloonText": "广告商季度支出 (2015 [[category]]): <b>[[value]]</b>",
      "fillAlphas": 0.9,
      "lineAlpha": 0.2,
      "title": "2005",
      "type": "column",
      "valueField": "year2005"
    }],
    "plotAreaFillAlphas": 0.1,
    "depth3D": 10,
    "angle": 10,
    "categoryField": "quarter",
    "categoryAxis": {
      "gridPosition": "start"
    },
    "export": {
      "enabled": true
    }
  });

})();
