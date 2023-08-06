<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResponseAttachments extends Model
{
    use HasFactory;
    protected $table = 'response_attachments';
    protected $fillable = [
        'response_id',
        'file_name',
        'mime_type',
        'file',
    ];
}
