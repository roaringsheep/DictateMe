'use strict';

angular.module('dictateMeApp')
  .controller('MainCtrl', function ($rootScope, $scope, $http, chart, music, setup) {
    $scope.everythingOK = false;
    $rootScope.$watch('everythingOK', function(newVal, oldVal){
    	$scope.everythingOK = $rootScope.everythingOK;
    })
    angular.element(window).ready(function () {
      setup.audioCtxSetup($scope);
    });
	    chart.initChart();
	    music.initMusic();

  });