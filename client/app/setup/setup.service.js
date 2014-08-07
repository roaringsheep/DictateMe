'use strict';

angular.module('dictateMeApp')
  .factory('setup', function ($rootScope, $timeout) {
    $rootScope.recorder;
    $rootScope.pitchAnalyzer;
    $rootScope.convert;
    $rootScope.playBack;
    $rootScope.refPitch;
    $rootScope.inputs;
    $rootScope.audio_context;
    $rootScope.messy;

    var whaChaDoin = function () {
      __log("Not sure what to do? Click 'Start' for me to start listening, 'Edit' to enter or modify notes manually.");
    };

    var more = function () {
      __log("Click 'Play Back' to play the notes on the screen. You can also change clef or have me play a reference tone for you.");
    }

     var wait = function () {
      $timeout(function () {
        if (!$rootScope.messy && $rootScope.everythingOK) {
          whaChaDoin();
          $timeout(function () {
            if (!$rootScope.messy && $rootScope.everythingOK) {
              more();
            }
          }, 10000);
        }
      }, 7000);
    };

    var __log = function (e, data) {
      var log = angular.element('#log');
      var logTxt = angular.element('<p class="animate">' + e + ' ' + (data || '') + '</p>');
      log.append(logTxt);
      $timeout(function () {
        logTxt.removeClass('animate');
      }, 3000);
      log[0].scrollTop = log[0].scrollHeight;
    };

    var startUserMedia = function ($scope, stream) {
      cleanUp();
      $rootScope.messy = false;
      $rootScope.inputs = $rootScope.audio_context.createMediaStreamSource(stream);
      window.source = $rootScope.inputs;
      if ($rootScope.inputs) {
        __log('Setting up some stuff for you...');
      } else {
        __log('Media stream failed to initialize.');
      }

      $rootScope.recorder = new Recorder($rootScope.inputs);
      if (!$rootScope.recorder) {
        __log('Recorder failed to initialize.');
      }

      $rootScope.pitchAnalyzer = new PitchAnalyzer(44100);
      if (!$rootScope.pitchAnalyzer) {
        __log('PitchAnalyzer failed to initialize.')
      }

      $rootScope.convert = new NoteConversion();
      if (!$rootScope.convert) {
        __log('Note Converter failed to initialize.')
      }

      $rootScope.playBack = $rootScope.audio_context.createOscillator();
      $rootScope.playBack.start(0);
      if (!$rootScope.playBack) {
        __log('Playback setup failed.')
      }

      $rootScope.refPitch = $rootScope.audio_context.createOscillator();
      $rootScope.refPitch.start(0);
      if (!$rootScope.refPitch) {
        __log('Reference Pitch initialization failed.')
      }

      if ($rootScope.inputs && $rootScope.recorder &&
        $rootScope.pitchAnalyzer && $rootScope.convert &&
        $rootScope.playBack && $rootScope.refPitch) {
        __log('Everything looks good!');
        $scope.everythingOK = true;
        $rootScope.everythingOK = true;
        $scope.$apply();
        wait();
      } else {
        __log('Uh oh. Something went wrong.');
      }
    };

    var audioCtxSetup = function ($scope) {
      try {
        // webkit shim
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        window.URL = window.URL || window.webkitURL;

        $rootScope.audio_context = new AudioContext;
        __log('Audio context set up.');
        __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
      } catch (e) {
        alert('No web audio support in this browser!');
        console.log('web audio error:', e);
      }
      navigator.getUserMedia({
        audio: true
      }, startUserMedia.bind(null, $scope), function (e) {
        __log("I can't listen without a mic access!");
        console.log('No live audio input: ' + e);
      });
    };

    var cleanUp = function () {
      $rootScope.toneArr = [];
      $rootScope.tones = "";
      $rootScope.prettyNotes = [];
      $rootScope.notes = [];
      $rootScope.acc = {
        C: 'n',
        D: 'n',
        E: 'n',
        F: 'n',
        G: 'n',
        A: 'n',
        B: 'n'
      };
    };

    return {
      __log: __log,
      startUserMedia: startUserMedia,
      audioCtxSetup: audioCtxSetup
    };
  });
