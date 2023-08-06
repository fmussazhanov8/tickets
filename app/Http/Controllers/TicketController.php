<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Responses;
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

        $lastTicket = Tickets::where('user_id',$request->user()->id)->select('created_at')->orderBy('id', 'desc')->first();
        if($lastTicket != null && strtotime($lastTicket->created_at) > strtotime('-24 hours'))
        {
            return Redirect::route('newticket')->with('error', 'Вы не можете создать более одного тикета в сутки');
        }
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
        return Inertia::render('NewTicket',['categories'=>$categories,'error'=>$request->session()->get('error')]);
    }
    public function showTicket($id)
    {
        $ticket = Tickets::getExactTicket($id);
        $responses = Responses::where('ticket_id',$id)
            ->select('responses.*', 'users.FirstName', 'users.LastName', 'users.email','users.isManager')
            ->join('users', 'responses.user_id', '=', 'users.id')
            ->get();
        return Inertia::render('Ticket',['ticket'=>$ticket,'responses'=>$responses]);
    }

}
