import moment from 'moment';
import $ from 'jquery';


export default function ($scope, $rootScope, eventListFactory) {
	$rootScope.x = 0;
	$rootScope.z = 0;

	// function to show current month
	
$scope.initCal = function () {

  this.initCal = () => {
    
			$rootScope.time_now = moment().format('YYYY, MMMM');
			$rootScope.month_header = document.getElementById('current_month');
			$rootScope.month_header.innerHTML = $rootScope.time_now;
			$rootScope.time_from_next_month = $rootScope.time_now;
			$rootScope.time_from_last_month = $rootScope.time_now;
			$rootScope.x = 0;
			$rootScope.z = 0;
			$scope.showday();
            //this.showday;
			$scope.showevent();
           // this.showevent;
		}
		// function to show date in HTML
     
	$scope.showday = function () {
   // this.showday = () => { 
		$rootScope.showdays = moment($scope.time).daysInMonth();
		// show how many days in month
		$rootScope.iddate = moment().format('YYYY, MM, ');
		document.getElementById('show_howmany_day').innerHTML = $rootScope.showdays + " days";
	//	$('.day').remove();
	//	$('.today').remove();
		
	//	$('.daytoday').remove();
		$rootScope.start_day = moment($rootScope.time_now).format('d');
		$scope.insert_day($rootScope.iddate);
	};

// show calendar body

	$scope.insert_day = function () {
			var board = document.getElementById('show_totaldays');
			for (var j = 0; j < $rootScope.start_day; j++) {
				var backside = document.createElement("div");
				backside.innerHTML = ' ';
				backside.className = 'unday day';
				board.appendChild(backside);
				console.log()
			}
			for (var i = 1; i <= $rootScope.showdays; i++) {
				
				console.log($rootScope.showdays);
				var backside = document.createElement("div");
				backside.innerHTML = '' + [i] + '';
				backside.className = 'day';
				backside.id = $rootScope.iddate + [i];
				board.appendChild(backside);
				$rootScope.ooo = document.getElementById($rootScope.iddate + [i]).id;
				var ooo = document.getElementById($rootScope.iddate + [i]).id;
				var ttt = moment().format('YYYY, MM, DD');

				var xxx = document.getElementById(ooo).id;
				if (ttt === ooo) {
					console.log(ooo)
					ooo = document.getElementById(ooo);
					ooo.className += "today";

				}
				
			}
		}  
	
// function to show last month
$scope.last_month = function () {
		$('.day').remove();
		$('.day unday').remove();
		$('.daytoday').remove();
		$rootScope.x += 1;
		$rootScope.time_from_last_month = moment($rootScope.time_from_next_month).subtract($rootScope.x, 'M').format('YYYY, MMMM');
		$rootScope.totalday_from_last_month = moment($rootScope.time_from_next_month).subtract($rootScope.x, 'M').format('YYYY, MM, DD');
		$rootScope.iddate = moment($rootScope.totalday_from_last_month).format('YYYY, MM, ');
		$rootScope.month_header.innerHTML = $rootScope.time_from_last_month;
		$rootScope.start_day = moment($rootScope.totalday_from_last_month).format('d');
		// show total days in month
		$scope.showdays_lastmonth = moment($rootScope.totalday_from_last_month).daysInMonth();
		document.getElementById('show_howmany_day').innerHTML = $scope.showdays_lastmonth + " days";
		// go to function to show calendar body
		$rootScope.showdays = $scope.showdays_lastmonth, $rootScope.iddate;
		$scope.insert_day();
		$scope.showevent();
		$rootScope.z = 0;
	};
	// function to show next month
	$scope.next_month = function () {
			$('.day').remove();
		$('.day unday').remove();
		$('.daytoday').remove();
		$rootScope.z += 1;
		$rootScope.time_from_next_month = moment($rootScope.time_from_last_month).add($rootScope.z, 'M').format('YYYY, MMMM');
		$rootScope.totalday_from_next_month = moment($rootScope.time_from_last_month).add($rootScope.z, 'M').format('YYYY, MM, DD');
		$rootScope.iddate = moment($rootScope.totalday_from_next_month).format('YYYY, MM, ');
		$rootScope.month_header.innerHTML = $rootScope.time_from_next_month;
		$rootScope.start_day = moment($rootScope.totalday_from_next_month).format('d');
		// show total days in month
		$scope.showdays_nextmonth = moment($rootScope.totalday_from_next_month).daysInMonth();
		document.getElementById('show_howmany_day').innerHTML = $scope.showdays_nextmonth + " days";
		// go to function to show calendar body
		$rootScope.showdays = $scope.showdays_nextmonth, $rootScope.iddate;
		$scope.insert_day();
		$scope.showevent();
		$rootScope.x = 0;
	};

// show event from database
$scope.showevent = function (events) {
//this.showevent = () => {   
		let DayList = document.querySelectorAll('#show_totaldays .day');
		eventListFactory.getList().then((list) => {
			for (let i = 0; i < DayList.length; i++) {
				let obj = DayList[i]
					, objDate = obj.id.replace(', ', '-').replace(', ', '-');
				for (let j = 0; j < list.data.length; j++) {
					let obj1 = list.data[j];
					if (moment(objDate).isSame(moment(obj1.Start_Time).startOf('day'))) {
						$(obj).append(`<div class="eventdiv"> 
                             <span class="tidstart">${moment(obj1.Start_Time).format('kk:mm')}</span> 
                             <span class="eventtital">${obj1.Title}</span>  
                         </div>`);
					}
				}
			}
		});
}

  $scope.showAdmin = () => {
    $scope.$broadcast('showHideAdmin', true);
  }
  $scope.$on('eventAdded', () => {
    $scope.showevent();
  });
}