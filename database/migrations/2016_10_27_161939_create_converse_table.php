<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConverseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('converse', function (Blueprint $table) {
            $table->string('emailGuest');
            $table->string('idMng');
            /**
            * {
            * guest: {
            *   content: xxx,
            *   time: yyy
            *   },
            * Mng : {
            *   content: xxx,
            *   time: yyy
            *   }
            * }
            **/
            $table->string('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('converse');
    }
}
