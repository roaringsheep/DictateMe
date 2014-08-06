function NoteConversion() {
  var populate = this.populateNumToNote();
  this.freqToNote = function (freq) {
    var num = this.freqToNum(freq);
    return this.numToNote[num];
  };
  this.noteToFreq = function (name) {
    var num = this.noteToNum[name];
    return this.numToFreq(num);
  };
}

NoteConversion.prototype.ln = function (x) {  return Math.log(x);  };
NoteConversion.prototype.sqrt = function (x, y) {
  var y = y || 2;
  return Math.pow(x, 1 / y);
};

NoteConversion.prototype.freqToNum = function (freq) {
  return Math.round((this.ln(freq) - this.ln(440) + 46 * this.ln(this.sqrt(2, 12))) / this.ln(this.sqrt(2, 12)));
};
NoteConversion.prototype.numToFreq = function (num) {
  return 440 * Math.pow(this.sqrt(2,12),(num-46));
};

NoteConversion.prototype.names = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
NoteConversion.prototype.namesToIndex = {
  'B#':13,
  'C':1,
  'C#':2,
  'Db':2,
  'D':3,
  "D#": 4,
  "Eb": 4,
  'E':5,
  'Fb':5,
  'E#':6,
  'F':6,
  'F#':7,
  'Gb':7,
  'G':8,
  'G#':9,
  'Ab':9,
  'A':10,
  'A#':11,
  'Bb':11,
  'Cb':0,
  'B':12
};
NoteConversion.prototype.octaves = [1,2,3,4,5,6,7,8];

NoteConversion.prototype.populateNumToNote = function(){
  var names = this.names;
  var index = 0;
  var No2Num = {};
  var Num2No = {};
  var N2I = this.namesToIndex;
  this.octaves.forEach(function(oct){
    names.forEach(function(name){
      index++;
      Num2No[index] = name+oct;
    });
    for(var key in N2I){
      No2Num[key+oct] = ((oct-1)*12) + N2I[key];
    }
  });
  NoteConversion.prototype.numToNote = Num2No;
  NoteConversion.prototype.noteToNum = No2Num;
};
