describe('Users Component', () => {
  let Users, login, $httpBackend, scope, controller, element;

  let endpoint = {
      login: '/api/users/login',
      register: '/api/users/register'
    };

  // Load the module before testing

  beforeEach(() => {
    angular.mock.module('usersApp');

    inject(function (_Users_, $rootScope, $compile, $componentController, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    Users = _Users_;
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
      Users.register('Olle').then(() => 'hej')
      expect(Users.register('Olle')).toEqual($http.post(endpoint.register, user));
   })
   });
   
   describe('Controller', () => {
    afterEach(function() {
      $httpBackend.verifyNoOutstandingRequest();
    });
    describe('http requests', () => {
       xit('should react to a successful login call', () => {
        $httpBackend.expectPOST(endpoint.login).respond(200, []);
        scope.loginUser('Olle');
        $httpBackend.flush();
        expect(window.location.href).toBe('/event')
      });
      xit('should react to a failed login call', () => {
        $httpBackend.expectPOST(endpoint.login).respond(400, []);
        
        
        $httpBackend.flush();
        
      });
    })
   });


});