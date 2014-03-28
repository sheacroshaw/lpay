

var mobilePayApp = angular.module('mobilePayApp',[])
.config(['$routeProvider',function($routeProvider){
  $routeProvider

}]);


mobilePayApp.factory("main_service",function(){

         //var Employees_added = {};
         //return {Employees_added: Employees_added};
         
       });



mobilePayApp.controller('MainPage', ['$timeout','$scope','$http', 'main_service', function ($timeout, $scope, $http, main_service) {
//fieldApp.controller('MasterInputOne', function($scope) {

  $scope.main = {};

  $scope.scan = function(){
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
  }




  $scope.rowsdata = [{Job_Number: '', Crew_Assignment: '', Onsite: '', Offsite: '', Per_Diem: ''}];

  $scope.res = "";

  $scope.AddRow = function() { 


    $scope.rowsdata.push({Job_Number: '', Crew_Assignment: '', Onsite: '', Offsite: '', Per_Diem: ''});

    console.log($scope.rowsdata);

  }

$("#main_list").hide();


  $scope.show_main_entry = function () { 
    console.log("running_Main")
      $("#main_entry").show();
      $("#main_list").hide();

      $("#on_main").addClass("btn-primary");
      $("#on_main").removeClass("btn-default");

      $("#on_list").removeClass("btn-primary");
      $("#on_list").addClass("btn-default");
  }


  $scope.show_main_list = function () { 

  getSelects();

      console.log("running_List")
      
      $("#main_entry").hide();
      $("#main_list").show();

      $("#on_list").addClass("btn-primary");
      $("#on_list").removeClass("btn-default");

      $("#on_main").removeClass("btn-primary");
      $("#on_main").addClass("btn-default");
  }



  $scope.move_back = function(index) { 

    console.log("hitting");

        //$scope.rowsdata.push($scope.rowsdata[index]);
        $scope.rowsdata.splice(index, 1);
        console.log($scope.rowsdata);

      }


      function hide_response_text (data_response_test) { 

        $("#show_me_callback").text(data_response_test);

        $timeout(function(){ 

          $("#show_me_callback").hide();      

        }, 3000);

      }


function getSelects(){
      $http.get('https://meta.layne.com/payroll/get_payroll.php')
        .success(function(data, status){

        $scope.Employees = data;
        
        console.log($scope.Employees);
          
        }).error(function(data, status, headers, config) {
         console.log('error it be');console.log( status); console.log( config);

         //$scope.divisions = {"Jobs":["24356","26776","27598","26987","22906","19465","16269"],"Emp":{"2900643":"James Gilchrist","1477361":"Chris Harding","389642":"Phillip Trip","33139682":"Lawrence Sherman","26912171":"Hugo Amezquita","20561420":"Mario Cartagena","165198":"George Gervais","21741191":"Jorge Hernandez"}};

         //console.log($scope.divisions);
         
      });


    };











      $scope.save_deal = function() { 


var allData = { Employees: $scope.rowsdata || '', Main_Details: $scope.Main }
//var allData = $scope.rowsdata;
console.log(allData);
$http.post('https://meta.layne.com/payroll/payroll_post.php', {data: allData}).then(function(result){
    //$http.post('https://ops.layne.com/get_pl3.php', allData).then(function(result){
      console.log('this is from the success', result);
      $scope.show_res = "good deal";
$("#show_me_callback").show();      
      $("#show_me_callback").addClass("bg-success");


      hide_response_text("Data Recieved");




      console.log(result.data);
    },function(result){
      console.log("no good");
      $scope.show_res = "Bad Deal";
      $("#show_me_callback").text("Bad Deal");
      $("#show_me_callback").addClass("bg-danger");

      hide_response_text("Error: Please Submit Again.");

      console.log(result.data);
    });
    //console.log($scope.Employees_added)


  }




}]);
