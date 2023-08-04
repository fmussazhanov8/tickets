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

      $tickets = $request->user()->isManager == 1?Tickets::getAllTicketList():Tickets::getTicketList( $request->user()->id);
      return Inertia::render('TicketList',['tickets'=>$tickets]);

    }
    public function form(Request $request)
    {
        $categories = Categories::get();
        return Inertia::render('NewTicket',['categories'=>$categories]);
    }
    public function showTicket($id)
    {
        $ticket = Tickets::getExactTicket($id);
        return Inertia::render('Ticket',['id'=>$id,'ticket'=>$ticket]);
    }

}
