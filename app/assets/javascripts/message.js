$(document).on('turbolinks:load', function() {

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    $this = $(this)[0];
    var formData = new FormData($(this).get(0));
    var flash_status = '';
    $('.flash-messages__notice').remove();
    $('.flash-messages__alert').remove();

    if (((formData.get('message[body]') != "") || formData.get('message[image]').size != 0)){
      $.ajax({
        type: 'POST',
        url: './messages',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json'
      })
      .done(function(message) {
        var html = buildHTML(message);
        $('.chat-messages').append(html);
        $('#message_body').val('');

        scrollBottom();
        flash_status = 'notice';
        var flash = buildflashmessage(flash_status);
        $(".flash-messages").prepend(flash);
        $this.reset();
      })
      .fail(function() {
        alert('error');
      });
    } else {
      flash_status = 'alert';
      var flash = buildflashmessage(flash_status);
      $('.flash-messages').prepend(flash);
    }
    return false;
  });

  function buildHTML(message) {
  var image = (message.image) ? `<img src = ${message.image}>` : "";

  var html = `
    <li class = "chat-message" data-message-id="${message.id}">
      <div class = "chat-message__header clearfix">
        <div class = "chat-message__name">
          ${message.name}
        </div>
        <div class = "chat-message__time">
          ${message.created_at}
        </div>
      </div>
      <div class = "chat-message__body">
        ${message.body}
      </div>
        ${image}
    </li>
    `;
  return html;
}

function buildflashmessage(status) {
  (status == 'notice') ? message = "投稿完了" : message = "投稿失敗";

  var flash = `
      <div class = "flash-messages__${status}">
        ${ message }
      </div>
    `;
  return flash;
}

function scrollBottom(){
  $('.chat-body').animate({
    scrollTop: $('.chat-messages').height()
  });
}

});


