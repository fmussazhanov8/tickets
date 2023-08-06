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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->timestamps();
        });
        DB::table('categories')->insert(
            array(
                array("title" => "Техническая поддержка", "created_at" => date("Y-m-d H:i:s")),
                array("title" => "Предложения по улучшению", "created_at" => date("Y-m-d H:i:s")),
                array("title" => "Отзыв о продукте", "created_at" => date("Y-m-d H:i:s")),
                array("title" => "Проблемы с оплатой", "created_at" => date("Y-m-d H:i:s")),
                array("title" => "Запрос на информацию", "created_at" => date("Y-m-d H:i:s")),
                array("title" => "Жалоба", "created_at" => date("Y-m-d H:i:s")),
                array("title" => "Партнерство", "created_at" => date("Y-m-d H:i:s")),
                array("title" => "Сотрудничество", "created_at" => date("Y-m-d H:i:s")),
                array("title" => "Сообщить об ошибке", "created_at" => date("Y-m-d H:i:s")),
                array("title" => "Другое", "created_at" => date("Y-m-d H:i:s"))
            )
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
