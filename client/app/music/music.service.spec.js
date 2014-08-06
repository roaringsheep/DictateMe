'use strict';

describe('Service: music', function () {

  // load the service's module
  beforeEach(module('dictateMeApp'));

  // instantiate service
  var music;
  beforeEach(inject(function (_music_) {
    music = _music_;
  }));

  it('should do something', function () {
    expect(!!music).toBe(true);
  });

});
