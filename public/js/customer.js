var $messages = $('.messages-content'),
    d, h, m,
    i = 0,
    $m = $('#m'),
    socketid,
    $email = $("#email"),
    $name = $("#name"),
    $form = $('form'),
    $login = $("#submitLogin"),
    spId = "",
    $button = $(".message-box form button");

var dataSp={
    "img":"",
    "name":"",
    "email":""
};
// Load socket
var socket = io('http://localhost:8888');

$m.prop("disabled", true);
$button.prop("disabled", true);

socket.on("socketid", function (id) {
    socketid = id;
});

socket.on("reg-fail", function (email) {
    alert("email " + email + " da co nguoi dang su dung!");
});

socket.on("reg-success", function (data) {
    // alert(data.email + "da dang ki thanh cong!");
    $(".login").remove();
});

$login.click(function (e) {
    e.preventDefault();

    socket.emit("data-user", {
        "email": $email.val(),
        "name": $name.val(),
        "socketid": socketid
    });

});

function setTimeNow() {
    let time;
    d = new Date();
    return d.getHours() + ":" + d.getMinutes();
}

$form.submit(function () {
    if ($m.val() !== '' && spId !== '') {
        socket.emit('messages-client', {
            msg: $m.val(),
            spId: spId,
            idClient: socketid,
            time: setTimeNow()
        });
        $m.val('');
    }
    return false;
});

// Load mScrollbar
$(window).load(function () {
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

socket.on('messages-server-data', function (data) {
    dataSp.img = data.img;
    dataSp.name = data.name;
    dataSp.email = data.email;
    spId = data.spId;

    $('#app > section > div.agent-face > img').attr("src", "/media/image/" + dataSp.img);
    $('#app > section > div.chat > div.chat-title > h1').text(dataSp.name);
    $('#app > section > div.chat > div.chat-title > h2').text(dataSp.email);
    $('#app > section > div.agent-face > img').attr("alt", dataSp.name);

    $('<div class="message new"><figure class="avatar"><img src="' + '/media/image/' + dataSp.img + '" /></figure>' + data.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    $m.prop("disabled", false);
    $button.prop("disabled", false);
    updateScrollbar();
    setDate();
});

socket.on('messages-server', function (data) {
    console.log(data);
    if ($.trim(data.msg) === '') {
        return false;
    }
    if (spId === "") {
        spId = data.spId;
    }
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="' + $('#app > section > div.agent-face > img').attr("src") + '" /></figure>' + data.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
    setDate();
});

socket.on("stt", function (data) {
    $('<div class="message message-personal">' + data + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
});


/**
 * typing....
 * @type {String}
 */
$m.keydown(function () {
    if($m.val() !== ''){
        socket.emit("typing-ctm",{
            stt: "true",
            idClient: socketid,
            spId: spId
        });
    }else{
        socket.emit("typing-ctm", {
            stt: "false",
            idClient: socketid,
            spId: spId
        });
    }
});
//
socket.on("typing-sp",function (data) {
    if(data.stt === "true") {
        if (!$('.message.new').hasClass("loading")) {
            $('<div class="message loading new"><figure class="avatar"><img src="'+ '/media/image/' + dataSp.img +'" /></figure><span></span></div>').appendTo($('.mCSB_container'));
            updateScrollbar();
        }
    }else{
        $('.message.loading').remove();
    }
});