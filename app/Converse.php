<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Converse extends Model
{
    protected $table = "converse";
    protected $fillable = ["emailGuest","idMng","content"];
}
