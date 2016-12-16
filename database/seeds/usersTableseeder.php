<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class usersTableseeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                'name'      => 'Xuan Hoang',
                'email'     => 'hoangxuan2402@gmail.com',
                'password'  => bcrypt('123123'),
                'level'     => 1,
                'image'     => 'profile-80_4.jpg'
            ]
        );
    }
}
