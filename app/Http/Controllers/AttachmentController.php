<?php

namespace App\Http\Controllers;

use App\Models\Attachments;
use App\Models\ResponseAttachments;
use Illuminate\Http\Request;

class AttachmentController extends Controller
{
    //
    public function download(Request $request,$type,$id)
    {
        if($type == 'response')
        {
            $attachment = ResponseAttachments::find($id);

        }
        if($type=='ticket')
        {
            $attachment = Attachments::find($id);
        }
        if($attachment == null)
        {
            abort(404);
        }
        $headers = [
            'Content-Type' => $attachment->mime_type,
            'Content-Disposition' => 'attachment; filename="' . $attachment->file_name . '"',
        ];
        return response()->streamDownload(function () use ($attachment) {
            echo $attachment->file;
        }, $attachment->file_name, $headers);

    }
}
