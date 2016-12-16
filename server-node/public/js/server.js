var $messages,
    $m = $('#m'),
    socket = io.connect("http://localhost:8888"),
    h = window.innerHeight,
    $people = $("#people"),
    $right = $("#right"),
    time,
    d = new Date(),
    meid;

var dataUser = {
    "name": "Xuân Hoàng",
    "email": "hoangxuan2402@gmail.com",
    "id": "",
    "img": "http://localhost:8888/public/assets/images/profile-80_4.jpg"
};

var $socketid;
console.log(socket);
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
    dataUser.id = data;
});

socket.on("reg-success", function(user) {

    $people.append("<li class=\"person\" data-chat=\"" + user.socketid + "\"><img src=\"/public/assets/images/profile-80_4.jpg\" alt=\"\" /><span class=\"name\">" + user.name + "</span><span class=\"time\">" + time + "</span><span class=\"preview\">+mgs+</span></li>");

    $right.append("<div class=\"chat\" data-chat=\"" + user.socketid + "\"> <div class=\"conversation-start\"> <span>" + time + "</span> </div> </div>");

    $('.left .person').click(function(e) {
        e.preventDefault();

        $m.prop("disabled", false);
        if (!$(this).hasClass('suported')) {
            socket.emit("messages-server", {
                msg: "Chào bạn! Tôi là " + dataUser.name + ", tôi có thể giúp gì cho bạn?",
                socketid: user.socketid,
                email: dataUser.email,
                spId: dataUser.id,
                img: dataUser.img
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


socket.on("discn", function(data) {
    $('.chat[data-chat="' + data + '"],.person[data-chat="' + data + '"]').remove();
});


//  de day
$('form').submit(function() {
    if ($m.val() !== '') {
        socket.emit('messages-server', {
            msg: $m.val(),
            socketid: $socketid,
            email: dataUser.email
        });
        $m.val(null);
    }
    return false;
});

socket.on("stt",function (data) {
    $('<div class="bubble me">' + data + '</div>').appendTo($('.chat[data-chat="' + $socketid + '"]'));
    updateScrollbar();
});
// nhan
socket.on('messages-client', function(data) {
    if ($.trim(data.msg) === '') {
        return false;
    }

    // if (data.key === $ss)
    //     $('<div class="bubble me">' + data.msg + '</div>').appendTo($messages);
    // else
    $('<div class="bubble you">' + data.msg + '</div>').appendTo($('.chat[data-chat="' + data.idClient + '"]'));
    updateScrollbar();
});



// height
window.onresize = function(event) {
    h = window.innerHeight
    $("#wrapper").css("height", h + "px");
};

$("a.uploadFile").click(function(e) {
    e.preventDefault();

    $("#uploadFile").click();
});

