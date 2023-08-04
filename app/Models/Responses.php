<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Responses extends Model
{
    use HasFactory;
    protected $table = 'responses';
    protected $fillable = [
        'ticket_id',
        'user_id',
        'message',
    ];
}
