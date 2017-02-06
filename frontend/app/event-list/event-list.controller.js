export default function ($scope, eventListFactory, moment, amMoment) {

  $scope.showAdmin = () => {
    $scope.$broadcast('showHideAdmin', true);
  };

  $scope.selected = _removeTime($scope.selected || moment());

  $scope.month = $scope.selected.clone();

  let start = $scope.selected.clone();
  start.date(1);
  _removeTime(start.day(0));

  _buildMonth($scope, start, $scope.month);

  $scope.select = function (day) {$
    $scope.selected = day.date;
  };

  $scope.next = function () {
    let next = $scope.month.clone();
    _removeTime(next.month(next.month() + 1).date(1));
    $scope.month.month($scope.month.month() + 1);
    _buildMonth($scope, next, $scope.month);
  };

  $scope.previous = function () {
    let previous = $scope.month.clone();
    _removeTime(previous.month(previous.month() - 1).date(1));
    $scope.month.month($scope.month.month() - 1);
    _buildMonth($scope, previous, $scope.month);
  };

  function _removeTime(date) {
    return date.day(1).hour(0).minute(0).second(0).millisecond(0);
  }

  function _buildMonth($scope, start, month) {
    $scope.weeks = [];
    let done = false, date = start.clone(), monthIndex = date.month(), count = 0;
    while (!done) {
      $scope.weeks.push({days: _buildWeek(date.clone(), month)});
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
  }

  function _buildWeek(date, month) {
    let days = [];
    for (let i = 0; i < 7; i++) {
      days.push({
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        listEvents: getEvents(date),
        isCurrentMonth: date.month() === month.month(),
        isPast: date.isBefore(new Date(), "day"),
        //isAvailable: $rootScope.bookingMonth[date.format('YYYY-MM-DD')],
        isToday: date.isSame(new Date(), "day"),
        date: date
      });
      date = date.clone();
      date.add(1, "d");
    }
    return days;
  }

  function getEvents(date) {
    let obj = [];
    eventListFactory.getList().then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (moment(date).isSame(moment(response.data[i].Start_Time), 'date')) {
          obj.push(response.data[i])
        }
      }
    });
    return obj
  }
}


