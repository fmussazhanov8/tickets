<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Tickets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
class TicketController extends Controller
{
    //

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'category' => 'required',
            'message' => 'required'
        ]);

        $ticket = new Tickets([
            'title' => $request->get('title'),
            'category_id' => $request->get('category'),
            'message' => $request->get('message'),
            'user_id' => $request->user()->id
        ]);

        $ticket->save();
        return Redirect::route('ticketlist');
    }
    public function list(Request $request)
    {
      $tickets =  Tickets::getTicketList( $request->user()->id);
        $list = [[
        "name"=> 'Leslie Alexander',
            "email"=> 'leslie.alexander@example.com',
            "role"=> 'Co-Founder / CEO',
            "imageUrl"=>'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            "lastSeen"=> '3h ago',
            "lastSeenDateTime"=> '2023-01-23T13:23Z',
        ]];
        return Inertia::render('TicketList',['list'=>$list,'tickets'=>$tickets]);
    }
    public function form(Request $request)
    {
        $categories = Categories::get();
        return Inertia::render('NewTicket',['categories'=>$categories]);
    }

}
