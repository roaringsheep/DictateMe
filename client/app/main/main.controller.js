'use strict';

angular.module('dictateMeApp')
  .controller('MainCtrl', function ($rootScope, $scope, $http, chart, music, setup, $timeout) {
    $scope.everythingOK = false;
    $rootScope.$watch('everythingOK', function (newVal, oldVal) {
      $scope.everythingOK = $rootScope.everythingOK;
    })
    angular.element(window).ready(function () {
      setup.audioCtxSetup($scope);
    });
    chart.initChart();
    music.initMusic();
    $rootScope.$watch('messy', function (newVal, oldVal) {
      $rootScope.messy = newVal;
    })

    $scope.waiting = $timeout(function () {
      if (!$rootScope.messy) {
        $scope.whaChaDoin();
        $timeout(function () {
          if (!$rootScope.messy) {
            $scope.more();
          }
        }, 7000);
      }
    }, 7000);

    $scope.whaChaDoin = function () {
      setup.__log("Not sure what to do? Click 'Start' for me to start listening, 'Edit' to enter or modify notes manually.");
    };

    $scope.more = function () {
      setup.__log("Click 'Play Back' to play the notes on the screen. You can also change clef or have me play a reference tone for you by using the dropdown menu on the right of the Edit button. Click <a href='/faq'>here</a> for more instructions.");
    }

    $scope.rUSrs = function () {
      setup.__log("Not satisfied with my guess? You can check out FAQ for more detailed instructions.")
    }
  });
