import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

interface TransactionUser {
    member_id: string;
    first_name: string;
    last_name: string;
    email: string;
    bank_name?: string;
    account_name?: string;
    account_number?: string;
}

interface Transaction {
    id: number;
    transaction_reference: string;
    type: 'buy' | 'sell' | 'incentive' | 'rebates' | string;
    requested_at: string;
    status: 'pending' | 'under_review' | 'rejected' | 'success';
    amount_in_zcoins: number;
    conversion_rate: number;
    remarks?: string | null;
    created_at: string;
    paid: boolean;
    user: TransactionUser | null;
}

interface EditTransactionProps {
    transaction: Transaction;
}

export default function EditTransaction({ transaction }: EditTransactionProps) {
    // Initialize form with transaction's editable fields only.
    const { data, setData, put, processing, errors } = useForm({
        status: transaction.status,
        remarks: transaction.remarks || '',
        paid: transaction.paid,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(route('transactions.update', transaction.id), {
            onSuccess: () => {
                // Optionally, show a success message or redirect
            },
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Transaction
                </h2>
            }
        >
            <Head title="Edit Transaction" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Transaction Summary */}
                    <div className="rounded bg-white p-6 shadow">
                        <h3 className="mb-4 text-lg font-semibold">
                            Transaction Details
                        </h3>
                        <p>
                            <strong>Reference:</strong>{' '}
                            {transaction.transaction_reference}
                        </p>
                        <p>
                            <strong>Type:</strong> {transaction.type}
                        </p>
                        <p>
                            <strong>Requested At:</strong>{' '}
                            {new Date(
                                transaction.requested_at,
                            ).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                        <p>
                            <strong>Amount (Zcoins):</strong>{' '}
                            {transaction.amount_in_zcoins}
                        </p>
                        <p>
                            <strong>Conversion Rate:</strong>{' '}
                            {transaction.conversion_rate}
                        </p>
                    </div>

                    {/* User Details */}
                    {transaction.user && (
                        <div className="rounded bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-semibold">
                                User Details
                            </h3>
                            <p>
                                <strong>Name:</strong>{' '}
                                {transaction.user.first_name}{' '}
                                {transaction.user.last_name}
                            </p>
                            <p>
                                <strong>Email:</strong> {transaction.user.email}
                            </p>
                            {/* Disbursement Info (display only) */}
                            <div className="mt-4">
                                <h3 className="mb-2 text-lg font-semibold">
                                    Disbursement Info
                                </h3>
                                <p>
                                    <strong>Bank Name:</strong>{' '}
                                    {transaction.user.bank_name || 'N/A'}
                                </p>
                                <p>
                                    <strong>Account Name:</strong>{' '}
                                    {transaction.user.account_name || 'N/A'}
                                </p>
                                <p>
                                    <strong>Account Number:</strong>{' '}
                                    {transaction.user.account_number || 'N/A'}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Edit Form */}
                    <div className="rounded bg-white p-6 shadow">
                        <h3 className="mb-4 text-lg font-semibold">
                            Edit Transaction
                        </h3>
                        <form onSubmit={submit}>
                            <div>
                                <label className="block text-sm font-medium">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData(
                                            'status',
                                            e.target.value as
                                                | 'pending'
                                                | 'under_review'
                                                | 'rejected'
                                                | 'success',
                                        )
                                    }
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="under_review">
                                        Under Review
                                    </option>
                                    <option value="rejected">Rejected</option>
                                    <option value="success">Success</option>
                                </select>
                                {errors.status && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {errors.status}
                                    </div>
                                )}
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium">
                                    Remarks
                                </label>
                                <textarea
                                    value={data.remarks}
                                    onChange={(e) =>
                                        setData('remarks', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                                ></textarea>
                                {errors.remarks && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {errors.remarks}
                                    </div>
                                )}
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium">
                                    Paid
                                </label>
                                <input
                                    type="checkbox"
                                    checked={data.paid}
                                    onChange={(e) =>
                                        setData('paid', e.target.checked)
                                    }
                                    className="mt-1"
                                />
                                {errors.paid && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {errors.paid}
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded bg-blue-600 px-4 py-2 text-white"
                                >
                                    Update
                                </button>
                                <Link
                                    href={route('transactions')}
                                    className="rounded bg-gray-300 px-4 py-2"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
