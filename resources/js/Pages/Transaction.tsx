import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

// Extend your shared PageProps to include optional filter values.
interface ExtendedPageProps extends PageProps {
    date?: string;
    user_id?: string;
    type?: string;
}

interface TransactionUser {
    member_id: string;
    first_name: string;
    last_name: string;
    email: string;
}

interface Transaction {
    id: number;
    transaction_reference: string;
    type: 'buy' | 'sell' | 'incentive' | 'rebates' | string;
    requested_at: string;
    status: 'pending' | 'under_review' | 'rejected' | 'success' | string;
    amount_in_zcoins: number;
    conversion_rate: number;
    remarks?: string | null;
    created_at: string;
    paid: boolean;
    user: TransactionUser | null;
}

interface TransactionsProps {
    transactions: Transaction[];
}

// Define FilterForm with an index signature to satisfy Inertia's constraint.
interface FilterForm {
    date: string;
    user_id: string;
    type: string;
    [key: string]: string;
}

export default function Transactions({ transactions }: TransactionsProps) {
    // Use the extended page props type.
    const { props } = usePage<ExtendedPageProps>();
    const authUser = props.auth?.user || { is_admin: false };

    // Set default date to today (YYYY-MM-DD) if not provided.
    const todayDate = new Date().toISOString().slice(0, 10);

    // Initialize filter form values.
    const { data, setData, get, processing } = useForm<FilterForm>({
        date: props.date ?? todayDate,
        user_id: props.user_id ?? '',
        type: props.type ?? '',
    });

    // Local state to control modal visibility.
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);

    // Form for Buy (Borrow) Zcoins.
    const {
        data: buyData,
        setData: setBuyData,
        post: buyPost,
        processing: buyProcessing,
        reset: resetBuyForm,
        errors: buyErrors,
    } = useForm({ amount: '' });

    // Form for Sell Zcoins.
    const {
        data: sellData,
        setData: setSellData,
        post: sellPost,
        processing: sellProcessing,
        reset: resetSellForm,
        errors: sellErrors,
    } = useForm({ amount: '' });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        get(route('transactions'), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Transactions
                </h2>
            }
        >
            <Head title="Transactions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Filter Form */}
                    <form
                        onSubmit={submit}
                        className="mb-6 rounded bg-white p-4 shadow"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                            <div className="mb-4 flex-1 md:mb-0">
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={(e) =>
                                        setData('date', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                />
                            </div>
                            {authUser.is_admin && (
                                <div className="mb-4 flex-1 md:mb-0">
                                    <input
                                        type="text"
                                        value={data.user_id}
                                        onChange={(e) =>
                                            setData('user_id', e.target.value)
                                        }
                                        placeholder="Enter user ID"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>
                            )}
                            <div className="flex items-end space-x-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700"
                                >
                                    Filter
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowBuyModal(true)}
                                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-white shadow-sm hover:bg-green-700"
                                >
                                    Buy Zcoins
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowSellModal(true)}
                                    className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-white shadow-sm hover:bg-red-700"
                                >
                                    Sell Zcoins
                                </button>
                            </div>
                        </div>
                    </form>

                    {transactions.length === 0 ? (
                        <div className="rounded bg-white p-4 shadow">
                            No transactions found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Ref
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Requested At
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Amount (Zcoins)
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Conversion Rate
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Paid
                                        </th>
                                        {authUser.is_admin && (
                                            <>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    User
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Actions
                                                </th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {
                                                    transaction.transaction_reference
                                                }
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                {transaction.type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    transaction.type.slice(1)}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                {transaction.requested_at}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                {transaction.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    transaction.status.slice(1)}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                {transaction.amount_in_zcoins}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                {transaction.conversion_rate}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                {transaction.paid
                                                    ? 'Yes'
                                                    : 'No'}
                                            </td>
                                            {authUser.is_admin && (
                                                <>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                        {transaction.user
                                                            ? `${transaction.user.first_name} ${transaction.user.last_name}`
                                                            : '—'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        <Link
                                                            href={route(
                                                                'transactions.edit',
                                                                transaction.id,
                                                            )}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            {transaction.paid
                                                                ? 'View'
                                                                : 'Process Transaction'}
                                                        </Link>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Buy Zcoins Modal */}
            {showBuyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="w-full max-w-md rounded bg-white p-6">
                        <h3 className="mb-4 text-lg font-semibold">
                            Buy (Borrow) Zcoins
                        </h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log(
                                    'Buy form submitted with amount:',
                                    buyData.amount,
                                );
                                buyPost(route('transactions.buyZcoins'), {
                                    onSuccess: () => {
                                        setShowBuyModal(false);
                                        resetBuyForm();
                                    },
                                    onError: (errors) => {
                                        console.error('Buy errors:', errors);
                                    },
                                });
                            }}
                        >
                            <div>
                                <label className="block text-sm font-medium">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={buyData.amount}
                                    onChange={(e) =>
                                        setBuyData('amount', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                                />
                                {buyErrors.amount && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {buyErrors.amount}
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowBuyModal(false);
                                        resetBuyForm();
                                    }}
                                    className="rounded bg-gray-300 px-4 py-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={buyProcessing}
                                    className="rounded bg-green-600 px-4 py-2 text-white"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Sell Zcoins Modal */}
            {showSellModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="w-full max-w-md rounded bg-white p-6">
                        <h3 className="mb-4 text-lg font-semibold">
                            Sell Zcoins
                        </h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log(
                                    'Sell form submitted with amount:',
                                    sellData.amount,
                                );
                                sellPost(route('transactions.sellZcoins'), {
                                    onSuccess: () => {
                                        setShowSellModal(false);
                                        resetSellForm();
                                    },
                                    onError: (errors) => {
                                        console.error('Sell errors:', errors);
                                    },
                                });
                            }}
                        >
                            <div>
                                <label className="block text-sm font-medium">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={sellData.amount}
                                    onChange={(e) =>
                                        setSellData('amount', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                                />
                                {sellErrors.amount && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {sellErrors.amount}
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowSellModal(false);
                                        resetSellForm();
                                    }}
                                    className="rounded bg-gray-300 px-4 py-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={sellProcessing}
                                    className="rounded bg-red-600 px-4 py-2 text-white"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
