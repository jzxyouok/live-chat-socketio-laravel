@extends('layouts.app')
@section('customCss')
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/css/customer.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.min.css">
@endsection
@section('content')
    <section class="avenue-messenger">
        <div class="menu">
            <div class="items">
                    <span>
                        <a href="#" title="Minimize">&mdash;</a>
                        <br>
                        <a href="#" title="End Chat">&#10005;</a>
                    </span>
            </div>
            <div class="button">...</div>
        </div>
        <div class="agent-face">
            <img class="agent circle" src="/media/image/logo-fe.png" alt="Xuân Hoàng">
        </div>
        <div class="chat">
            <div class="chat-title">
                <h1>...</h1>
                <h2>...</h2>
            </div>
            <div class="login">
                <div class="form-group">
                    <input type="email" name="name" id="email" class="form-control" placeholder="email..." required="required" >
                </div>
                <div class="form-group">
                    <input type="text" name="name" id="name" class="form-control" placeholder="name..." required="required" >
                </div>
                <button type="submit" id="submitLogin" class="btn btn-primary">Gửi</button>
            </div>
            <div class="messages">
                <div class="messages-content"></div>
            </div>
            <div class="message-box">
                <form>
                    <input type="text" id="m" class="message-input" placeholder="Type message...">
                    <button type="submit" class="message-submit">Send</button>
                </form>
            </div>
        </div>
    </section>
@endsection

@section('customJs')
    <script src="js/jquery.js"></script>
    <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
    <script src="/js/customer.js"></script>
@endsection