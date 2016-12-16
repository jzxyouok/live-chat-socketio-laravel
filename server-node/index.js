/**
 * Config app
 **/
var express = require("express"),
    app = express(),
    server = require("http").Server(app),
    io = require("socket.io")(server),
    port = Number(process.env.PORT || 8888),
    userOnl = [];

server.listen(port, function () {
    console.log("server is runing on localhost:8888");
});


function delEmail(a) {
    var i = userOnl.indexOf(a);
    if (i != -1) {
        userOnl.splice(i,1);
    }
}
// Route
// app.use("/public", express.static(__dirname + '/public'));
// app.use(express.static("public"));
//
// app.get("/server", function(req, res) {
//     res.sendFile(__dirname + "/views/server.html");
// });
// app.get("/client", function(req, res) {
//     res.sendFile(__dirname + "/views/client.html");
// });
//
// app.get("/suported", function(req, res) {
//     res.sendFile(__dirname + "/views/suported.html");
// });
// app.get("/customer", function(req, res) {
//     res.sendFile(__dirname + "/views/customer.html");
// });

//check user connect
io.on("connection", function (socket) {
    console.log("Co nguoi ket noi voi id: " + socket.id);
    io.to(socket.id).emit("socketid", socket.id);

    //check user disconnect
    socket.on("disconnect", function () {
        console.log("id: " + socket.id + " da ngat ket noi!");
        // if (userOnl.indexOf(socket.id) >= 0) {
        io.sockets.emit("discn", socket.id);
        // userOnl.pop();
        // }
    });

    socket.on("data-user", function (users) {
        if (userOnl.indexOf(users.email) >= 0) {
            io.to(users.socketid).emit("reg-fail", users.email);
            console.log(userOnl);
        } else {
            userOnl.push(users.email);
            socket.Username = users.name;
            // socket.id = users.email;
            // io.to(users.socketid).emit("reg-success",users); // sua lai gui cho moi ng quan tri
            io.sockets.emit("reg-success", users);

            console.log(userOnl);
        }
    });

    socket.on("messages-server-data", function (data) {
        io.to(data.socketid).emit("messages-server-data", {
            msg: data.msg,
            spId: data.spId,
            img: data.img,
            email: data.email,
            name: data.name
        });
    });

    socket.on("messages-server", function (data) {
        console.log(data);
        io.to(data.socketid).emit("messages-server", {
            msg: data.msg,
            spId: data.spId
        });
        io.to(socket.id).emit("stt", data.msg);
    });

    socket.on("messages-client", function (data) {
        console.log(data);
        if (data.spId !== '') {
            io.to(data.spId).emit("messages-client", {
                msg: data.msg,
                idClient: data.idClient,
                time: data.time
            });
            io.to(socket.id).emit("stt", data.msg);
        } else {
            io.to(socket.id).emit("stt", "Vui lòng chờ nhân viên hổ trợ một lát! xin cảm ơn!");
        }
    });

    socket.on("typing-ctm",function(data){
        io.to(data.spId).emit("typing-ctm", {
            stt: data.stt,
            idClient: data.idClient
        });
    });
    socket.on("typing-sp",function(data){
        io.to(data.idClient).emit("typing-sp", {
            stt: data.stt
        });
    });

}); // connected
