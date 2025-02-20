import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export interface Downline {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    sponsor: string | null;
}

export interface GroupedDownlines {
    [sponsor: string]: Downline[];
}

interface DownlinesProps {
    downlines: GroupedDownlines;
}

export default function Downlines({ downlines }: DownlinesProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Downlines
                </h2>
            }
        >
            <Head title="Downlines" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {Object.keys(downlines).length === 0 ? (
                        <div className="rounded bg-white p-4 shadow">
                            No downlines found.
                        </div>
                    ) : (
                        Object.entries(downlines).map(([sponsor, group]) => (
                            <div key={sponsor} className="mb-8">
                                <h3 className="mb-2 text-lg font-semibold">
                                    Sponsor: {sponsor}
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    ID
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Email
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {group.map((downline) => (
                                                <tr key={downline.id}>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {downline.id}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                        {downline.first_name}{' '}
                                                        {downline.last_name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                        {downline.email}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
