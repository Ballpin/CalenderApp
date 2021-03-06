
describe('eventList component', () => {
  var element;
  var rootScope;
  var scope;
  var controller;
  var $httpBackend;
  var moment;
  var amMoment;
  var mockService;
  var deferred;

  beforeEach(() => {
    angular.mock.module('eventList');

    angular.mock.module(function($provide){
      $provide.factory('eventListFactory', function($q){
        function getList(){
          deferred = $q.defer();
            return deferred.promise;
        }
        function getSingle(){
          deferred = $q.defer();
            return deferred.promise;
        }
        return{getList: getList, getSingle: getSingle};
      });
    });

    inject(function($rootScope, $compile, $controller, $componentController, _$httpBackend_, eventListFactory, _amMoment_, _moment_){
    $httpBackend = _$httpBackend_;
    rootScope = $rootScope;
    mockService = eventListFactory;
    moment = _moment_;
    amMoment = _amMoment_;

    spyOn(rootScope, '$broadcast').and.callThrough();
    spyOn(mockService, 'getList').and.callThrough();
    spyOn(mockService, 'getSingle').and.callThrough();
   
    scope = $rootScope.$new();
    element = angular.element('<event-list></event-list>');
    element = $compile(element)(scope);
    scope.$apply();
    controller = $componentController('eventList', {$scope: scope, eventListFactory: mockService});
    });
  });

  it('should be defined', () => {
    expect(scope).not.toBeUndefined();
  });
  
  it('should have show admin function', () => {
    expect(scope.showAdmin).toBeDefined();
  });
  
  it('should have selected date function', () => {
    expect(scope.selected).toBeDefined();
  });

  it('should have previous function', () => {
    expect(scope.previous).toBeDefined();
  });
  
  it('should have next function', () => {
    expect(scope.next).toBeDefined();
  }); 
  
  it('should have select date function', () => {
    expect(scope.select).toBeDefined();
  });
  
  it('should make http call to get the event list', () => {
    expect(mockService.getList).toHaveBeenCalled();
  });

  it('should broadcast event to ng-show admin panel on click', () => {
    scope.showAdmin();
    expect(rootScope.$broadcast).toHaveBeenCalledWith('showHideAdmin', true);
  });
  it('should add a single event when event has been added in admin panel', () => {
    scope.$broadcast('eventAdded', ('event'));
    expect(mockService.getSingle).toHaveBeenCalledWith('event');
  })
});

describe('testing factory', () => {
    var $httpBackend;
    var eventListFactory
    
    beforeEach(() => {
      angular.mock.module('eventList');

      inject((_eventListFactory_, _$httpBackend_) => {
        $httpBackend = _$httpBackend_;
        eventListFactory = _eventListFactory_;
        
      })
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('has a function that sends GET for all events', () => {
      $httpBackend.expectGET('/api/').respond(200, []);
      eventListFactory.getList();
      $httpBackend.flush();
    });
    it('has a function that sends GET for a single event', () => {
      $httpBackend.expectGET('/api/666').respond(200, []);
      eventListFactory.getSingle(666);
      $httpBackend.flush();
    })
});