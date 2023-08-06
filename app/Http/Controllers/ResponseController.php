<?php

namespace App\Http\Controllers;

use App\Models\ResponseAttachments;
use App\Models\Responses;
use Illuminate\Http\Request;
use Inertia\Response;

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
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->getRealPath();
                $doc = file_get_contents($path);
//                $base64 = addslashes($doc);
                $mime = $file->getClientMimeType();
                ResponseAttachments::create([
                    'file_name'=> $file->getClientOriginalName(),
                    'file' => $doc,
                    'response_id' => $response->id,
                    'mime_type'=> $mime,
                ]);
            }
        }
        return redirect()->back();
    }
}
