'use strict';

angular.module('dictateMeApp')
  .factory('setup', function ($rootScope) {
    $rootScope.recorder;
    $rootScope.pitchAnalyzer;
    $rootScope.convert;
    $rootScope.playBack;
    $rootScope.refPitch;
    $rootScope.inputs;
    $rootScope.audio_context;

    var __log = function (e, data) {
      log.innerHTML += '<br>' + e + " " + (data || '');
      log.scrollTop = log.scrollHeight;
    };

    var startUserMedia = function ($scope, stream) {
      cleanUp();
      $rootScope.inputs = $rootScope.audio_context.createMediaStreamSource(stream);
      window.source = $rootScope.inputs;
      if ($rootScope.inputs) {
        __log('input found...');
      } else {
        __log('Media stream failed to initialize.');
      }

      $rootScope.recorder = new Recorder($rootScope.inputs);
      if ($rootScope.recorder) {
        __log('mic ready...');
      } else {
        __log('Recorder failed to initialize.');
      }

      $rootScope.pitchAnalyzer = new PitchAnalyzer(44100);
      if ($rootScope.pitchAnalyzer) {
        __log('fetching analyzer...');
      } else {
        __log('PitchAnalyzer failed to initialize.')
      }

      $rootScope.convert = new NoteConversion();
      if ($rootScope.convert) {
        __log('setting up converter...');
      } else {
        __log('Note Converter failed to initialize.')
      }

      $rootScope.playBack = $rootScope.audio_context.createOscillator();
      $rootScope.playBack.noteOn(0);
      if ($rootScope.playBack) {
        __log('getting ready to play back...');
      } else {
        __log('Playback setup failed.')
      }

      $rootScope.refPitch = $rootScope.audio_context.createOscillator();
      $rootScope.refPitch.noteOn(0);
      if ($rootScope.refPitch) {
        __log('finding tuning forks...');
      } else {
        __log('Reference Pitch initialization failed.')
      }

      if ($rootScope.inputs && $rootScope.recorder &&
        $rootScope.pitchAnalyzer && $rootScope.convert &&
        $rootScope.playBack && $rootScope.refPitch) {
        __log('Everything looks good!');
        $scope.everythingOK = true;
        $scope.$apply();
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
