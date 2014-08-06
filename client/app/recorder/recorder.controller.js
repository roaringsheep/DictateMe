'use strict';

angular.module('dictateMeApp')
  .controller('RecorderCtrl', function ($rootScope, $scope, music, chart, setup, $interval) {

    var detectPitch;
    var renderChart;
    var index = 0;
    var tempArr = [];
    $rootScope.recording = false;
    $scope.recording = $rootScope.recording;

    var mode5 = function (array) {
      if (array.length == 0)
        return null;
      var modeMap = {};
      var maxEl = array[0],
        maxCount = 1;
      for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null)
          modeMap[el] = 1;
        else
          modeMap[el]++;
        if (modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }
      if (modeMap[maxEl] >= 5) {
        return maxEl;
      }
      return null;
    };

    var determineNote = function (arr) {
      var notesArr = []
      for (var i = 0; i < arr.length - 1; i++) {
        if ((arr[i] == arr[i + 1]) && (notesArr.length == 0 || notesArr[notesArr.length - 1] !== arr[i])) {
          notesArr.push(arr[i]);
        }
      }
      return notesArr;
    };

    $scope.start = function () {
      if ($rootScope.toneArr.length > 1) {
        tempArr = [];
        $rootScope.toneArr = [];
        $rootScope.prettyNotes = [];
        $rootScope.notes = [];
        $rootScope.dps = [];
        $rootScope.playRdy = false;
        $rootScope.acc = {
          C: 'n',
          D: 'n',
          E: 'n',
          F: 'n',
          G: 'n',
          A: 'n',
          B: 'n'
        };
        chart.initChart();
        music.initMusic();
        setup.__log("Everything's clean.")
      }

      $rootScope.recorder && $rootScope.recorder.record();
      $scope.recording = true;
      $rootScope.recording = $scope.recording;
      setup.__log('Listening...');

      detectPitch = $interval(function () {
        $rootScope.recorder.getBuffer(function (buffer) {
          $rootScope.pitchAnalyzer.input(buffer[0]);
          $rootScope.pitchAnalyzer.process();
          var tone = $rootScope.pitchAnalyzer.findTone();
          if (tone !== null) {
            var note = $rootScope.convert.freqToNote(tone.freq);
            var normFreq = $rootScope.convert.noteToFreq(note);
            if (tempArr.length < 10) {
              tempArr.push(note);
            } else {
              var mostFreq = mode5(tempArr);
              if (mostFreq) {
                $rootScope.toneArr.push(mostFreq);
              }
              tempArr = [note];
            }
            // console.log("tempArr", tempArr);
            // console.log('toneArr', $rootScope.toneArr);
            // console.log('Found a tone, frequency:', tone.freq, 'volume:', tone.db, 'noteName:', note, 'normalized frequency: ', normFreq);
            $rootScope.dps.push({
              x: index++,
              y: tone.freq
            });
          }
        })
        $rootScope.recorder.clear();
      }, 10);
      renderChart = $interval(function () {
        $rootScope.chart.render();
      }, 1000);
    }

    $scope.stop = function () {
      $rootScope.recorder && $rootScope.recorder.stop();
      $scope.recording = false;
      $rootScope.recording = $scope.recording;
      setup.__log('Stopped listening.');
      $rootScope.recorder.clear();
      $interval.cancel(detectPitch);
      $interval.cancel(renderChart);
      $rootScope.tones = determineNote($rootScope.toneArr).join(',');
      if ($rootScope.tones.length < 1) {
        setup.__log("I didn't find any recognizable tones!");
      } else {
        music.addNotes($rootScope.tones);
        setup.__log("Not satisfied with the guess? Why don't you check out " + "<a href='/faq'>FAQ</a>" + " for ways to improve my guess?");
      }
    };

  });
