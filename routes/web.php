<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('customer.customer',['name'=>'customer page']) ;
});


Auth::routes();

Route::group(['prefix'=>'admin', 'middleware'=>'checkAdmin'],function(){
    Route::get('/','AdminController@index');
    Route::get('/supporter',function() {
        return view('admin.supporter', ['name' => 'Support page']);
    });
    Route::get('/adduser','controllerAddUser@index');
    Route::post('/adduser','controllerAddUser@store');
    Route::post('/sendMes','MessengerController@store');
});

Route::get("/error",function(){
   return view('errors.notaccess');
})->name("error");


//Route::get('/test',function(){
//    return print_r(explode("$|$",'Xuan Hoang: adasdas$|$Xuan Hoang: dasd$|$Xuan Hoang: asd$|$Xuan Hoang: asd$|$asdasd: adasda$|$asdasd: asd$|$asdasd: asdasd$|$'));
//});

