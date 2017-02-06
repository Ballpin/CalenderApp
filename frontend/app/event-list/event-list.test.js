
describe('eventList component', () => {
  var element;
  var scope;
  var controller;
  var $httpBackend;
  var moment;
  var amMoment;
  var eventListFactory;

  beforeEach(() => {
    angular.mock.module('eventList');

    inject(function($injector, $rootScope, $compile, $componentController, _$httpBackend_, _eventListFactory_, _amMoment_, _moment_){
    $httpBackend = _$httpBackend_;
    eventListFactory = _eventListFactory_;
    moment = _moment_;
    amMoment = _amMoment_;
    scope = $rootScope.$new();
    element = angular.element('<event-list></event-list>');
    element = $compile(element)(scope);
    scope.$apply();
    controller = $componentController('eventList', null, {$scope: scope, moment, amMoment, eventListFactory});
    });
  });


  it('should be defined', () => {
    console.log("controller ? : ", controller)
    expect(scope).not.toBeUndefined();
  });
  
//  it('should have a function to add an event', () => {
//    expect(controller.initCal).toBeDefined();
//  });

  it('should have a function to add an event', () => {
    expect(controller.showday).toBeDefined();
  });
  
  
  
});