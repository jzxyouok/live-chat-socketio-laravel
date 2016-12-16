@extends('layouts.app')

@section('customCss')
    <script>
        var dataUser = {
            "name": "{{ Auth::user()->name }}",
            "email": "{{ Auth::user()->email }}",
            "id": "{{ Auth::user()->id }}",
            "img": "{{ Auth::user()->image }}"
        };
    </script>
    <link rel="stylesheet" href="/css/server.css">
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" type="text/css">
@endsection

@section('content')
    <div class="wrapper" id="wrapper">
        <div class="container-sp">
            <div class="left">
                <div class="top">
                    <input type="text" />
                    <a href="javascript:;" class="search"></a>
                </div>
                <ul class="people" id="people">
                </ul>
            </div>
            <div class="right">
                <div class="top"><span>To: <span class="name"></span></span>
                </div>
                <div id="right"></div>
                <div class="write">
                    <form>
                        <a class="write-link attach uploadFile"></a>
                        <input type="file" class="hidden" id="uploadFile">
                        <input id="m" type="text" />
                        <!-- <a href="javascript:;" class="write-link smiley"></a> -->
                        <button class="write-link send"></button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('customJs')
    <script src="/js/jquery.js"></script>
    <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
    <script src="/js/server.js"></script>
@endsection