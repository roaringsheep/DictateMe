'use strict';

angular.module('dictateMeApp')
  .factory('chart', function ($rootScope) {
    $rootScope.chart;
    $rootScope.dps = [];
    return {
      initChart: function () {
        $rootScope.dps = [];
        $rootScope.chart = new CanvasJS.Chart('raw', {
          title: {
            text: "Input Frequencies"
          },
          axisY: {
            tickLength: 100,
            title: 'Frequency(Hz)'
          },
          data: [{
            type: 'line',
            dataPoints: $rootScope.dps
          }],
          zoomEnabled: true
        });
        $rootScope.chart.render();
      },
    };
  });
