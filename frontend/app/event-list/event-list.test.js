
describe('eventList component', () => {
  var element;
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
          return{getList: getList};
      });
    });

    inject(function($rootScope, $compile, $controller, $componentController, _$httpBackend_, eventListFactory, _amMoment_, _moment_){
    $httpBackend = _$httpBackend_;
    mockService = eventListFactory;
    moment = _moment_;
    amMoment = _amMoment_;

    spyOn(mockService, 'getList').and.callThrough();
   
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
});