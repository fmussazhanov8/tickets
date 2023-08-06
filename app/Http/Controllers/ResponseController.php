<?php

namespace App\Http\Controllers;

use App\Models\Responses;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required',
            'ticketId' => 'required',
        ]);

        $response = new Responses([
            'message' => $request->get('message'),
            'ticket_id' => $request->get('ticketId'),
            'user_id' => $request->user()->id
        ]);

        $response->save();
        return redirect()->back();
    }
}
