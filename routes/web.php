<?php

use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResponseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TicketController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Redirect::route('ticketlist');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/newticket', [TicketController::class,'form'])->middleware(['auth', 'verified'])->name('newticket');
Route::post('/newticket',  [TicketController::class, 'store'])->middleware(['auth', 'verified'])->name('post.newticket');
Route::get('/ticket/{id}', [TicketController::class,'showTicket'])->middleware(['auth', 'verified'])->name('ticket');
Route::get('/ticketlist', [TicketController::class, 'list'])->middleware(['auth', 'verified'])->name('ticketlist');

Route::post('/newresponse', [ResponseController::class, 'store'])->middleware(['auth', 'verified'])->name('post.newresponse');
Route::get('attachment/{type}/{id}',[AttachmentController::class,'download'])->middleware(['auth', 'verified'])->name('download.attachment');




//Route::middleware('auth')->group(function () {
//    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//});

require __DIR__.'/auth.php';
