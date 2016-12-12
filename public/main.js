$(document).ready(function(){
  $('.thankYou').hide()
  $('.yesOrNoSection').show()
  $('.noFormSection').hide()
console.log(window.location.href);
var params = window.location.href.substring(27).split('=').join('').split('&').join('').split('one')
params.shift()

  var userId = params[0]
  var linkId = params[1]
  var customerId = params[2]
  var messageId = params[3]
  $.get('/api/user/' + userId, function(biz,status,xhr){
    $('.bizName').text(biz[0].businessname)
  })
  $.get('/api/link/' + linkId, function(link, status, xhr){
    $(".yes").attr("href", "http://www.cnn.com");
  })
  $('.yes').on('click', function(){
    $.ajax({
    url: '/api/positivemessage/' + messageId,
    type: 'PUT',
    success: function(result) {
        console.log(result);
    }
});
  })
  $('.no').on('click', function(){
    $.ajax({
    url: '/api/negativemessage/' + messageId,
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
    $.ajax({
    url: '/api/complaint/' + messageId,
    type: 'PUT',
    data: {complaint: complaint},
    success: function(result) {
      $('.noFormSection').hide()
      $('.thankYou').show()
    }
  });


  })

})
