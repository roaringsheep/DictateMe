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
      if (!$rootScope.messy && !$rootScope.everythingOK) {
        $scope.whaChaDoin();
        $timeout(function () {
          if (!$rootScope.messy && !$rootScope.everythingOK) {
            $scope.more();
          }
        }, 10000);
      }
    }, 7000);

    var fixCanvas = function () {
      $scope.$apply(function() {
        $scope.width = window.innerWidth;
        if($scope.width <450) {
          $rootScope.canvasWidth = 300;
        } else if($scope.width < 600){
          $rootScope.canvasWidth = 400;
        } else if($scope.width < 800){
          $rootScope.canvasWidth = 550;
        } else if ($scope.width < 1000) {
          $rootScope.canvasWidth = 650;
        } else if ($scope.width < 1200){
          $rootScope.canvasWidth = 950;
        } else {
          $rootScope.canvasWidth = 850;
        }
          music.initMusic();
      })
    }
    $scope.width = window.innerWidth;
    window.onresize = fixCanvas;


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
