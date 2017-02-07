
export default function($scope, $http) {
  this.events;
  this.errorText;
  this.shouldShow = false;
  this.newEvent = {};
  this.today = moment();
  
  $scope.$on('showHideAdmin', (event, bool) => {
    this.shouldShow = bool;
  });

  this.addItem = () => {
    const toPost = { 
      "Title": this.newEvent.title,
      "Start_Time": this.newEvent.startTime,
      "End_Time": this.newEvent.endTime
    };
    this.postEvent(toPost);
  };
  this.sayHiOnChange = (msg) => {
    console.log(`input field say ${msg}`);
  }
  this.fetchEvents = () => {
    $http.get('/api/').then((resp) => {
      this.events = resp.data;
    }, (err) => { 
      // handle error please
    }
    );
  };
  this.postEvent = (event) => {
    $http({
      method: 'POST',
      url: '/api/',
      data: event
    }).then((resp) => {
    // this callback will be called asynchronously
    // when the response is available
      $scope.$emit('eventAdded', resp.data.id);
      this.shouldShow = false;
      this.newEvent = {};
    }, (err) => {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
      const error = () => { 
        switch(err.status) {
          case 400:
            return "Hmm. We seem to have sent a bad request (400). Probably a programmer error!"
          case 403: 
            return "It seems you are not authorized to post events. Try logging in as an administrator."
          default:
            return 'Unknown error. Please try again!'
        }
      }
      this.errorText = error();
  });
  }
}