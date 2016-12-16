<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;

use Illuminate\Support\Facades\Input;


class controllerAddUser extends Controller
{
    /**
     * controllerAddUser constructor.
     */
    public function __construct()
    {
        $this->middleware('checkAdmin');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.adduser');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rq = $request->all();
        if (Input::hasFile('image')) {
            $path = public_path('media/image');
            $extension = Input::file('image')->getClientOriginalExtension();
            $img = time() . '.' . $extension;
            Input::file('image')->move($path, $img);
        } else {
            $img = "profile-80_4.jpg";
        }

        User::create([
            'name' => $rq['name'],
            'email' => $rq['email'],
            'password' => bcrypt($rq['password']),
            'level' => $rq['level'], // guest,
            'image' => $img
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
