'use strict';

describe('Service: chart', function () {

  // load the service's module
  beforeEach(module('dictateMeApp'));

  // instantiate service
  var chart;
  beforeEach(inject(function (_chart_) {
    chart = _chart_;
  }));

  it('should do something', function () {
    expect(!!chart).toBe(true);
  });

});
