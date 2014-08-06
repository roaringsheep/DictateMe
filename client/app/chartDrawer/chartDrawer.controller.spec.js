'use strict';

describe('Controller: ChartdrawerCtrl', function () {

  // load the controller's module
  beforeEach(module('dictateMeApp'));

  var ChartdrawerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartdrawerCtrl = $controller('ChartdrawerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
