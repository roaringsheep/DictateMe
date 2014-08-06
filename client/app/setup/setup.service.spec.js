'use strict';

describe('Service: setup', function () {

  // load the service's module
  beforeEach(module('dictateMeApp'));

  // instantiate service
  var setup;
  beforeEach(inject(function (_setup_) {
    setup = _setup_;
  }));

  it('should do something', function () {
    expect(!!setup).toBe(true);
  });

});
