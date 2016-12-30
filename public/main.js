$(document).ready(function(){
  $('.thankYou').hide()
  $('.yesOrNoSection').show()
  $('.noFormSection').hide()
console.log(window.location.href);
var params = window.location.href.substring(27).split('=').join('').split('&').join('').split('one')
params.shift()
console.log(params);
  var userId = params[0]
  var linkId = params[1]
  var customerId = params[2]
  var messageId = params[3]
  $.get('https://www.in-sightreviews.com/api/user/' + userId, function(user,status,xhr){
    $('.bizName').text(user[0].businessname)
  })
  $.get('https://www.in-sightreviews.com/api/link/' + linkId, function(theLink, status, xhr){
    $(".yes").attr("href", theLink[0].reviewlink);
  })
  $('.yes').on('click', function(){
    $.ajax({
    url: 'https://www.in-sightreviews.com/api/positivemessage/' + messageId + '/' + customerId + '/' + userId,
    type: 'PUT',
    success: function(result) {
        console.log(result);
    }
});
  })
  $('.no').on('click', function(){
    $.ajax({
    url: 'https://www.in-sightreviews.com/api/negativemessage/' + messageId,
    type: 'PUT',
    success: function(result) {
      $('.thankYou').hide()
      $('.yesOrNoSection').hide()
      $('.noFormSection').show()
    }
});
  })
  $('button').on('click', function(){
    var complaint = $('textarea').val()
    $.post('https://www.in-sightreviews.com/api/complaint/' + messageId + '/' + complaint + '/' + customerId + '/' + userId, {complaint: complaint}, function(result){
      $('.noFormSection').hide()
      $('.thankYou').show()
    })


  })

})
