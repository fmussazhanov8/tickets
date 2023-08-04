<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tickets extends Model
{
    use HasFactory;
    protected $table = 'tickets';
    protected $fillable = [
        'category_id',
        'title',
        'message',
        'user_id',
    ];
    public static function getTicketList($user_id)
    {
        return Tickets::where('user_id', $user_id)
            ->select('tickets.*', 'categories.title as category_name', 'users.FirstName', 'users.LastName', 'users.email')
            ->join('categories', 'tickets.category_id', '=', 'categories.id')
            ->join('users', 'tickets.user_id', '=', 'users.id')
            ->get();
    }
}
