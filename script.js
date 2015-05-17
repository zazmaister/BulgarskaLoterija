angular.module('app', []);

angular.module('app').controller('PromiseController', function($scope, $q){
  
  
  $scope.firePromise = function()
  {
    $scope.status = "Žrebanje...";
    $scope.result = [];
    
    var promise = getRandomNumber();
    
    promise.then(function(success){
      
      $scope.result.push(success);
      return getRandomNumber();

    }, function(error){

    }).then(function(success){
      $scope.result.push(success);
      return getRandomNumber();
    }, function(error){
      
    }).then(function(success){
      $scope.status = 'Žrebanje končano';
      $scope.result.push(success);
    },function(error){

    });
  }
  
  
  function getRandomNumber()
  {
    var deffered = $q.defer();
    var randNumber;
    var delay = Math.random() * 3000 + 2000;
    
    setTimeout(function(){
      
      do{
          randNumber= Math.round(Math.random()*99+1);
      }while(isInsideArray(randNumber));

      if(randNumber<101 && randNumber>0)
        {
          deffered.resolve({randomNumber:randNumber, delay:delay});
        }
      else
        {
          deffered.reject(randNumber);
        }
      
    }, delay);
    
    
    return deffered.promise;
  }

  function isInsideArray(number)
  {
    for(var i=0; i<$scope.result.length;i++){
      if($scope.result[i] === number)
        return true;
    }
    return false;
  }
  
});