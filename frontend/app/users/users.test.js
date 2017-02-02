describe('Users Factory', () => {
  let Users, login;


  // Load the module before testing
  beforeEach(angular.mock.module('usersApp'));


  beforeEach(inject(function (_Users_) {
    Users = _Users_;
  }));

  it('should exist', function () {
    expect(Users).toBeDefined();
  });

  describe('.login()', () => {

    it('should exist', () => {
      expect(Users.login).toBeDefined();
    });



  });


});