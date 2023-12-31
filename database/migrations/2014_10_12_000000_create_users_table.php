<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('FirstName');
            $table->string('LastName');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('isManager')->default('0');
            $table->rememberToken();
            $table->timestamps();


        });
        DB::table('users')->insert(
            array(
                'email' =>'manager@gmail.com',
                'FirstName'=>'Farukh',
                'LastName'=>'Mussazhanov',
                'password'=>Hash::make('1234'),
                'isManager'=>'1',
            )
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
