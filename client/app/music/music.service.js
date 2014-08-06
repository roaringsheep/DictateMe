'use strict';

angular.module('dictateMeApp')
  .factory('music', function ($rootScope) {
    var clefOpt = [{
      name: 'treble',
      value: 'treble'
    }, {
      name: 'bass',
      value: 'bass'
    }, {
      name: 'alto',
      value: 'alto'
    }, {
      name: 'tenor',
      value: 'tenor'
    }];

    $rootScope.acc = {
      C: 'n',
      D: 'n',
      E: 'n',
      F: 'n',
      G: 'n',
      A: 'n',
      B: 'n'
    };

    $rootScope.toneArr = [];
    $rootScope.tones = "";
    $rootScope.prettyNotes = [];
    $rootScope.notes = [];
    $rootScope.clefSlct = clefOpt[0];
    $rootScope.renderer;
    $rootScope.rndCtx;
    $rootScope.stave;
    $rootScope.voice;
    $rootScope.formatter;

    var music = {
      clefOpt: clefOpt,
      initMusic: function () {
        $rootScope.canvas = {
          element: angular.element("#musicCanvas")[0],
          width: 800
        };

        $rootScope.renderer = new Vex.Flow.Renderer($rootScope.canvas.element, Vex.Flow.Renderer.Backends.CANVAS);
        $rootScope.rndCtx = $rootScope.renderer.getContext();
        $rootScope.renderer.resize($rootScope.canvas.width, 150);
        $rootScope.stave = new Vex.Flow.Stave(10, 0, $rootScope.canvas.width - 25);
        $rootScope.stave.addClef($rootScope.clefSlct.value).setContext($rootScope.rndCtx).draw();
      },
      addVoice: function () {
        $rootScope.voice = new Vex.Flow.Voice({
          num_beats: $rootScope.notes.length,
          beat_value: 4,
          resolution: Vex.Flow.RESOLUTION
        });
        $rootScope.voice.addTickables($rootScope.notes);
        $rootScope.formatter = new Vex.Flow.Formatter().joinVoices([$rootScope.voice]).format([$rootScope.voice], $rootScope.canvas.width - 25);
        $rootScope.voice.draw($rootScope.rndCtx, $rootScope.stave);
      },
      //Parse edit syntax to VexFlow syntax
      parseName: function (name) {
        var prevAcc = $rootScope.acc[name[0]];
        var currAcc = "";
        if (name.length == 3) {
          currAcc = name[1];
          $rootScope.acc[name[0]] = currAcc;
          if (prevAcc == 'n') {
            return new Vex.Flow.StaveNote({
              clef: $rootScope.clefSlct.value,
              keys: [name.splice(2, 0, '/')],
              duration: 'q'
            }).
            addAccidental(0, new Vex.Flow.Accidental(name[1]));
          } else if (prevAcc !== 'n' && prevAcc !== currAcc) {
            return new Vex.Flow.StaveNote({
              clef: $rootScope.clefSlct.value,
              keys: [name.splice(2, 0, '/')],
              duration: 'q'
            }).
            addAccidental(0, new Vex.Flow.Accidental('n')).addAccidental(0, new Vex.Flow.Accidental(name[1]));
          }

        } else {
          currAcc = 'n';
          $rootScope.acc[name[0]] = currAcc;
          if (prevAcc !== 'n') {
            return new Vex.Flow.StaveNote({
              clef: $rootScope.clefSlct.value,
              keys: [name.splice(1, 0, '/')],
              duration: 'q'
            }).
            addAccidental(0, new Vex.Flow.Accidental('n'));
          } else {
            return new Vex.Flow.StaveNote({
              clef: $rootScope.clefSlct.value,
              keys: [name.splice(1, 0, '/')],
              duration: 'q'
            });
          }
        }
      },
      //add notes to be drawn on the staff
      addNotes: function (string) {
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
        if (!string) {
          music.initMusic();
        } else {
          var notez = string.split(',');
          notez.forEach(function (note) {
            note = note.trim();
            var fst = note[0].toUpperCase();
            note = note.slice(1);
            note = fst + note;
            $rootScope.notes.push(music.parseName(note));
          });
          music.initMusic();
          music.addVoice();
        }
      }
    };
    return music;
  });
