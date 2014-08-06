'use strict';

angular.module('dictateMeApp')
  .controller('EngravemusicCtrl', function ($rootScope, $scope, music, setup, $interval) {
    $scope.clefOpt = music.clefOpt;
    $scope.clefSlct = $rootScope.clefSlct;
    $scope.recording = $rootScope.recording;
    $scope.editOn = false;
    $scope.tones = $rootScope.tones;

    $rootScope.$watch('tones', function (newVal, oldVal) {
      $scope.tones = newVal;
    });
    $rootScope.$watch('recording', function (newVal, oldVal) {
      $scope.recording = newVal;
    });
    // $rootScope.$watch('acc', function (newVal, oldVal) {
    //   $scope.acc = newVal;
    // })


    $scope.refTonesOpt = [{
      name: 'C',
      value: '261.63'
    }, {
      name: 'C#',
      value: '277.18'
    }, {
      name: 'D',
      value: '293.66'
    }, {
      name: 'D#',
      value: '311.13'
    }, {
      name: 'E',
      value: '329.63'
    }, {
      name: 'F',
      value: '349.33'
    }, {
      name: 'F#',
      value: '369.99'
    }, {
      name: 'G',
      value: '392.00'
    }, {
      name: 'G#',
      value: '415.30'
    }, {
      name: 'A',
      value: '440.00'
    }, {
      name: 'A#',
      value: '466.16'
    }, {
      name: 'B',
      value: '493.88'
    }];

    //my own Splice function for String
    String.prototype.splice = function (idx, rem, s) {
      return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
    };
    $scope.clefApply = function () {
      $rootScope.clefSlct = $scope.clefSlct;
      if ($rootScope.tones) {
        music.addNotes($rootScope.tones);
      } else {
        music.initMusic();
      }
    }

    $scope.refToneSlct = $scope.refTonesOpt[9];

    $scope.playRefTone = function () {
      var freq = $scope.refToneSlct.value;
      freq = parseFloat(freq);
      $rootScope.refPitch.frequency.value = freq;
      var playBtn = angular.element('#refTonePlay');
      if (playBtn.hasClass('playRdy')) {
        $rootScope.refPitch.connect($rootScope.audio_context.destination);
        playBtn.toggleClass('playRdy', false);
        playBtn.html('Stop');
      } else {
        $rootScope.refPitch.disconnect($rootScope.audio_context.destination);
        playBtn.toggleClass('playRdy', true);
        playBtn.html('Play');
      }
    };

    var play;
    $rootScope.playRdy = false;


    var namePretty = function (name) {
      if (name.length == 4) {
        return name.splice(2, 1, '');
      } else {
        return name.splice(1, 1, '');
      }
    };

    var prettify = function (notes) {
      notes.forEach(function (note) {
        $rootScope.prettyNotes.push(namePretty(note.keys[0]));
      });
    };

    $scope.playNotes = function () {
      $rootScope.prettyNotes = [];
      prettify($rootScope.notes);
      $rootScope.everythingOK = false;
      $rootScope.playBack.type = 3;
      $rootScope.playBack.frequency.value = 1;
      $rootScope.playBack.connect($rootScope.audio_context.destination);
      var newArr = [];
      var index = 0;
      $rootScope.prettyNotes.forEach(function (str) {
        str = str.trim();
        var fst = str[0].toUpperCase();
        str = str.slice(1);
        str = fst + str;
        newArr.push($rootScope.convert.noteToFreq(str));
      });
      play = $interval(function () {
        if (index < newArr.length) {
          $rootScope.playBack.frequency.value = newArr[index];
          index++;
        } else {
          $rootScope.playBack.disconnect($rootScope.audio_context.destination);
          $interval.cancel(play);
          $rootScope.everythingOK = true;
        }
      }, 800);
    };

    $scope.edit = function () {
      var editView = angular.element('#editInput');
      var editBtn = angular.element('#musicEdit');
      if ($scope.editOn === false) {
        $scope.editOn = true;
        editBtn.html('Submit');
      } else {
        $scope.editOn = false;
        editBtn.html('Edit');
        $rootScope.tones = $scope.tones;
        music.addNotes($rootScope.tones);
      }
    };
  });
