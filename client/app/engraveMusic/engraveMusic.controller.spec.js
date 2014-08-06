'use strict';

describe('Controller: EngravemusicCtrl', function () {

  // load the controller's module
  beforeEach(module('dictateMeApp'));

  var EngravemusicCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EngravemusicCtrl = $controller('EngravemusicCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
