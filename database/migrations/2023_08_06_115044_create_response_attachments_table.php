<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('response_attachments', function (Blueprint $table) {
            $table->id();
            $table->string('file_name');
            $table->string('mime_type');
            $table->unsignedBigInteger('response_id');
            $table->timestamps();
            $table->foreign('response_id')->references('id')->on('responses');
        });
        DB::statement("ALTER TABLE response_attachments ADD COLUMN file  LONGBLOB");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('response_attachments');
    }
};
