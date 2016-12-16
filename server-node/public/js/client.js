var $messages = $('.messages-content'),
    d, h, m,
    i = 0,
    $m = $('#m'),
    socketid,
    $email=$("#email"),
    $name=$("#name"),
    $form = $('form'),
    $login = $("#login"),
    spId="";

// Load socket
var socket = io();

socket.on("socketid",function(id){
  socketid=id;
});

socket.on("reg-fail",function(email){
  alert("email "+ email +" da co nguoi dang su dung!");
});

socket.on("reg-success",function(data){
  // alert(data.email + "da dang ki thanh cong!");
  $(".login").remove();
});

$login.click(function(e){
  e.preventDefault();

  socket.emit("data-user",{
    "email":$email.val(),
    "name":$name.val(),
    "socketid": socketid
  });

});

$form.submit(function() {
    let time;
    d = new Date();
    time = d.getHours() + ":" + d.getMinutes();
    if($m.val()!==''){
        socket.emit('messages-client', {
            msg:$m.val(),
            spId:spId,
            idClient:socketid,
            time:time
        });
        $m.val(null);
    }
    return false;
});

// Load mScrollbar
$(window).load(function() {
    $messages.mCustomScrollbar();
});

function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
}

function setDate() {
    d = new Date();
    if (m !== d.getMinutes()) {
        m = d.getMinutes();
        $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    }
}

socket.on('messages-server', function(data) {
    if ($.trim(data.msg) === '') {
        return false;
    }
    if(spId === "")
        spId = data.spId;

    // if (data.socketid === $ss)
    //     $('<div class="message message-personal">' + data.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    // else
        $('<div class="message new"><figure class="avatar"><img src="public/client/profile-80_4.jpg" /></figure>' + data.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');

    setDate();
    updateScrollbar();
});

socket.on("stt",function (data) {
    $('<div class="message message-personal">' + data + '</div>').appendTo($('.mCSB_container')).addClass('new');
});

function setTimeNow() {
    let time;
    d = new Date();
    return d.getHours() + ":" + d.getMinutes();
}

/**
 * typing....
 * @type {String}
 */
// $('<div class="message loading new"><figure class="avatar"><img src="public/profile-80_4.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
//     updateScrollbar();
