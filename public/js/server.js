var $messages,
    $m = $('#m'),
    socket = io.connect("http://localhost:8888"),
    h = window.innerHeight,
    $people = $("#people"),
    $right = $("#right"),
    time,
    d = new Date(),
    meid;



var $socketid,nameUser,emailUser;

time = d.getHours() + ":" + d.getMinutes() + " - ngày " + d.getDate();
$("#wrapper").css("height", h + "px");
$m.prop("disabled", true);

function updateScrollbar() {
    $("html, body").animate({ scrollTop: $(document).height() }, 100);
}
function setTimeNow() {
    let time;
    d = new Date();
    return d.getHours() + ":" + d.getMinutes();
}

socket.on("socketid", function(data) {
    spId = data;
});

socket.on("reg-success", function(user) {
    nameUser = user.name;
    emailUser = user.email;
    $people.append("<li class=\"person\" data-chat=\"" + user.socketid + "\"><img src=\"/media/image/logo-fe.png\" alt=\"\" /><span class=\"name\">" + user.name + "</span><span class=\"time\">" + time + "</span><span class=\"preview\">+mgs+</span></li>");

    $right.append("<div class=\"chat\" data-chat=\"" + user.socketid + "\"> <div class=\"conversation-start\"> <span>" + time + "</span> </div> </div>");

    $('.left .person').click(function(e) {
        e.preventDefault();

        $m.prop("disabled", false);
        if (!$(this).hasClass('suported')) {
            socket.emit("messages-server-data", {
                msg: "Chào bạn! Tôi là " + dataUser.name + ", tôi có thể giúp gì cho bạn?",
                socketid: user.socketid,
                email: dataUser.email,
                spId: spId,
                img: dataUser.img,
                name: dataUser.name
            });
        }
        if ($(this).hasClass('.active')) {
            return false;
        } else {

            $socketid = $(this).attr('data-chat');
            var personName = $(this).find('.name').text();
            $('.right .top .name').html(personName);
            $('.chat').removeClass('active-chat');
            $('.left .person').removeClass('active');
            $(this).addClass('active suported');
            $('.chat[data-chat="' + $socketid + '"]').addClass('active-chat');
        }
        $messages = $(".chat.active-chat");
    });

});

var contentMsg = "";

socket.on("discn", function(data) {
    $('.chat[data-chat="' + data + '"],.person[data-chat="' + data + '"]').remove();
    if(contentMsg !== '')
        $.post("/admin/sendMes",{
            "emailGuest":emailUser,
            "idMng":dataUser.email,
            "content":contentMsg
        });
});


//  de day
$('form').submit(function() {
    if ($m.val() !== '') {
        socket.emit('messages-server', {
            msg: $m.val(),
            socketid: $socketid
        });
        $m.val(null);
    }
    return false;
});
// me
socket.on("stt",function (data) {
    $('<div class="bubble me">' + data + '</div>').appendTo($('.chat[data-chat="' + $socketid + '"]'));
    contentMsg = contentMsg + dataUser.name + ": " + data + "$|$";
    updateScrollbar();
});
// you
socket.on('messages-client', function(data) {
    if ($.trim(data.msg) === '')
        return false;

    // if (data.key === $ss)
    //     $('<div class="bubble me">' + data.msg + '</div>').appendTo($messages);
    // else
    $('.bubble.you.loading').remove();
    $('<div class="bubble you">' + data.msg + '</div>').appendTo($('.chat[data-chat="' + data.idClient + '"]'));
    contentMsg = contentMsg + nameUser + ": " + data.msg + "$|$";
    updateScrollbar();
});


$m.keydown(function () {
    if ($m.val() !== '') {
        socket.emit("typing-sp", {
            stt: "true",
            idClient: $socketid
        });
    }else{
        socket.emit("typing-sp", {
            stt: "false",
            idClient: $socketid
        });
    }
});

socket.on("typing-ctm", function (data) {
    if(data.stt === "true") {
        if (!$('.bubble.you').hasClass("loading")) {
            $('<div class="bubble loading you"><span></span><span></span><span></span></div>').appendTo($('.chat[data-chat="' + data.idClient + '"]'));
            updateScrollbar();
        }
    }else{
        $('.bubble.you.loading').remove();
    }
});


// height
window.onresize = function(event) {
    h = window.innerHeight;
    $("#wrapper").css("height", h + "px");
};

$("a.uploadFile").click(function(e) {
    e.preventDefault();

    $("#uploadFile").click();
});

