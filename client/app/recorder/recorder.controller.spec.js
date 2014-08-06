'use strict';

describe('Controller: RecorderCtrl', function () {

  // load the controller's module
  beforeEach(module('dictateMeApp'));

  var RecorderCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecorderCtrl = $controller('RecorderCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
