describe('Users Component', () => {
  let Users, login, $httpBackend, scope, controller, element, location;

  let endpoint = {
      login: '/api/users/login',
      register: '/api/users/register'
    };

  // Load the module before testing

  beforeEach(() => {
    angular.mock.module('usersApp');

    inject(function (_Users_, _$location_, $rootScope, $compile, $componentController, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    Users = _Users_;
    location = _$location_;
    scope = $rootScope.$new();
    element = angular.element('<users-app></users-app>');
    element = $compile(element)(scope);
    scope.$apply();
    controller = $componentController('usersApp', {$scope: scope});
    });
  });

  it('Users factory should exist', function () {
    expect(Users).toBeDefined();
  });

  describe('.login()', () => {

    it('should exist', () => {
      expect(Users.login).toBeDefined();
    });
  });

   describe('.register()', () => {

    it('should exist', () => {
      expect(Users.register).toBeDefined();
    });
    it('should return a call to register a user', () => {
     
   })
   });
   
   describe('Controller', () => {
    beforeEach(() => {
      scope.loginUser('Olle');
    });
    afterEach(function() {
      $httpBackend.verifyNoOutstandingRequest();
    });
    describe('http requests', () => {
       it('should react to a successful login call', () => {
        spyOn(location, 'path').and.callThrough();
        $httpBackend.expectPOST(endpoint.login).respond(200, []);
        $httpBackend.flush();
        expect(location.path).toHaveBeenCalledWith('/events');
      });
      it('should react to a failed login call', () => {
        $httpBackend.expectPOST(endpoint.login).respond(400, []);
        $httpBackend.flush();
        expect(scope.error.css).toEqual({"display": "block"});
      });
    })
   });


});