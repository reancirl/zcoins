<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            // Transaction type: Buy, Sell, Incentive, or Rebates.
            $table->enum('type', ['buy', 'sell', 'incentive', 'rebates'])
                ->comment('Transaction type: Buy, Sell, Incentive, or Rebates');

            // Date and time when the transaction was requested.
            $table->timestamp('requested_at')->nullable()
                ->comment('Date and time when the transaction was requested');

            // Transaction status.
            $table->enum('status', ['pending', 'under_review', 'rejected', 'success'])
                ->default('pending')
                ->comment('Transaction status');

            $table->boolean('paid')->default(false);

            // User who made the transaction.
            $table->unsignedBigInteger('user_id')
                ->comment('User who initiated the transaction');
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            // Amount in Zcoins.
            $table->decimal('amount_in_zcoins', 15, 2)
                ->comment('Amount in Zcoins');

            // Conversion rate (PHP per 1 Zcoin) at time of request.
            $table->decimal('conversion_rate', 10, 2)
                ->default(60)
                ->comment('Conversion rate: PHP per 1 Zcoin');

            // Additional suggested fields:

            // Unique transaction reference for tracking purposes.
            $table->string('transaction_reference')->unique()->nullable()
                ->comment('Unique transaction reference');

            // Remarks or notes regarding the transaction.
            $table->text('remarks')->nullable()
                ->comment('Additional remarks regarding the transaction');

            // Timestamp when the transaction was processed.
            $table->timestamp('processed_at')->nullable()
                ->comment('Date and time when the transaction was processed');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
