$(document).ready(function(){
  $('.thankYou').hide()
  $('.yesOrNoSection').show()
  $('.noFormSection').hide()

  var params = window.location.href.substring(23).split('/')
  var userId = params[0]
  var linkId = params[1]
  var customerId = params[2]
  var messageId = params[3]
  $.get('/api/user/' + 15, function(biz,status,xhr){
    $('.bizName').text(biz[0].businessname)
  })
  $.get('/api/link/' + 19, function(link, status, xhr){
    $(".yes").attr("href", "http://www.cnn.com");
  })
  $('.yes').on('click', function(){
    $.ajax({
    url: '/api/positivemessage/' + 29,
    type: 'PUT',
    success: function(result) {
        console.log(result);
    }
});
  })
  $('.no').on('click', function(){
    $.ajax({
    url: '/api/negativemessage/' + 29,
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
    url: '/api/complaint/' + 29,
    type: 'PUT',
    data: {complaint: complaint},
    success: function(result) {
      $('.noFormSection').hide()
      $('.thankYou').show()
    }
  });


  })

})
