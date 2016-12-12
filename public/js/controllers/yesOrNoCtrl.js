angular.module('yesOrNo').controller('yesOrNoCtrl', function($scope, linksService, messageService, userService){

  $scope.yesOrNoSectionShowing = true;
  $scope.noFromSectionShowing = false;
  $scope.thankYouSection = false;
// console.log(window.location.href)
  var params = window.location.href.substring(25).split('/')
var userId = params[0]
var linkId = params[1]
var customerId = params[2]
var messageId = params[3]

  userService.getUser(userId).then(function(res){
    $scope.user = res.data[0]
    console.log($scope.user);
linksService.getLink(linkId).then(function(res){
      $scope.reviewLink = res.data[0].reviewlink
})
  })
  $scope.clickedYes = function(){
    messageService.positive(messageId)
  }
  $scope.clickedNo = function(){
    $scope.yesOrNoSectionShowing = false;
    $scope.noFromSectionShowing = true;
    $scope.thankYouSection = true;
    messageService.negative(messageId)

  }

  $scope.submit = function(complaint){
    $scope.yesOrNoSectionShowing = false;
    $scope.noFromSectionShowing = false;
    $scope.thankYouSection = true;
    messageService.complaint(messageId, complaint)
  }



  //  = 'https://www.google.com/search?q=spencer+sprinklers&rlz=1C5CHFA_enUS691US691&oq=spencer+sprinklers&aqs=chrome..69i57.4617j0j1&sourceid=chrome&ie=UTF-8#lrd=0x8752f70050b56229:0x951b6313f154c0bd,3'
})
