import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface HistoryEntry {
    id: number;
    user_name: string;
    code_used: string;
    security_code: string | null;
    used_at: string;
    sponsor: string;
}

interface ActivationCodesHistoryProps {
    history: HistoryEntry[];
}

export default function ActivationCodesHistory({
    history,
}: ActivationCodesHistoryProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Activation Codes History
                </h2>
            }
        >
            <Head title="Activation Codes History" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {history.length === 0 ? (
                        <div className="rounded bg-white p-4 shadow">
                            No history found.
                        </div>
                    ) : (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                User
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Activation Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Security Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Used At
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Sponsor
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {history.map((entry) => (
                                            <tr key={entry.id}>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                    {entry.user_name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                    {entry.code_used}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                    {entry.security_code || '—'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                    {entry.used_at}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                    {entry.sponsor}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
