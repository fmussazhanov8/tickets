<?php

namespace App\Http\Controllers;

use App\Models\Attachments;
use App\Models\Categories;
use App\Models\ResponseAttachments;
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
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->getRealPath();
                $doc = file_get_contents($path);
//                $base64 = addslashes($doc);
                $mime = $file->getClientMimeType();
                Attachments::create([
                    'file_name'=> $file->getClientOriginalName(),
                    'file' => $doc,
                    'ticket_id' => $ticket->id,
                    'mime_type'=> $mime,
                ]);
            }
        }
        return Redirect::route('ticketlist');
    }
    public function list(Request $request)
    {

      $tickets = $request->user()->isManager == 1?Tickets::getAllTicketList():Tickets::getTicketList( $request->user()->id);
      return Inertia::render('TicketList',['tickets'=>$tickets,'error'=>$request->session()->get('error')]);

    }
    public function close(Request $request){
        $ticket = Tickets::find($request->get('ticketId'));
        $ticket->isClosed = 1;
        $ticket->save();
        return redirect()->back();
    }
    public function form(Request $request)
    {
        $categories = Categories::get();
        return Inertia::render('NewTicket',['categories'=>$categories,'error'=>$request->session()->get('error')]);
    }
    public function showTicket(Request $request, $id)
    {
        $ticket = Tickets::getExactTicket($id);
        if($ticket == null)
        {
            return Redirect::route('ticketlist')->with('error', 'Тикет не найден');
        }
        if($request->user()->isManager == 1||$request->user()->id == $ticket->user_id)
        {
            $responses = Responses::where('ticket_id',$id)
                ->select('responses.*', 'users.FirstName', 'users.LastName', 'users.email','users.isManager')
                ->join('users', 'responses.user_id', '=', 'users.id')
                ->join('response_attachments', 'responses.id', '=', 'response_attachments.response_id')
                ->get();
            $attachments = Attachments::where('ticket_id',$id)->select('id','file_name')->get();
            $ticket->attachments = empty($attachments)?[]:$attachments;

            foreach ($responses as $response)
            {
                $response->attachments = ResponseAttachments::where('response_id',$response->id)->select('id','file_name')->get();
            }

            return Inertia::render('Ticket',['ticket'=>$ticket,'responses'=>$responses]);
        }
       return Redirect::route('ticketlist')->with('error', 'У вас нет доступа к этому тикету');
    }

}
