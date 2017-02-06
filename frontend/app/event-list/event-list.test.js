
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

    inject(function($rootScope, $compile, $componentController, _$httpBackend_, _eventListFactory_, _amMoment_, _moment_){
    $httpBackend = _$httpBackend_;
    eventListFactory = _eventListFactory_;
    moment = _moment_;
    amMoment = _amMoment_;
    scope = $rootScope.$new();
    element = angular.element('<event-list></event-list>');
    element = $compile(element)(scope);
    controller = $componentController('eventList', null, {scope, moment, amMoment, eventListFactory });
    });
  });

// check controller
  it('should be defined', () => {
    expect(controller).not.toBeUndefined();
  });


  it('should have previous function', () => {
    expect(controller.previous).toBeDefined();
  });
  
  it('should have next function', () => {
    expect(controller.next).toBeDefined();
  }); 
  
  
// check u
  it('eventListFactory should exist', function () {
    expect(eventListFactory).toBeDefined();
  });

  describe('.getList() from eventListFactory', () => {
    it('should exist', () => {
      expect(eventListFactory.getList).toBeDefined();
    });
  }); 
  
});