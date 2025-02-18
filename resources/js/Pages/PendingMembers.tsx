import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

interface PendingUser {
    id: number;
    first_name: string;
    last_name: string;
    code_used: string;
    email: string;
    sponsor_id: string | null;
}

interface OfficialMember {
    id: number;
    first_name: string;
    last_name: string;
}

interface PendingMembersProps {
    pendingUsers: PendingUser[];
    officialMembers: OfficialMember[];
}

export default function PendingMembers({
    pendingUsers,
    officialMembers,
}: PendingMembersProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pending Members
                </h2>
            }
        >
            <Head title="Pending Members" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {pendingUsers.length === 0 ? (
                        <div className="rounded bg-white p-4 shadow">
                            No pending members.
                        </div>
                    ) : (
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
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Code Used
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Security Code
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Parent
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {pendingUsers.map((user) => (
                                        <PendingUserRow
                                            key={user.id}
                                            user={user}
                                            officialMembers={officialMembers}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

interface PendingUserRowProps {
    user: PendingUser;
    officialMembers: OfficialMember[];
}

function PendingUserRow({ user, officialMembers }: PendingUserRowProps) {
    // Set up a form for each pending user row with useForm.
    // The useForm hook automatically includes the necessary Inertia headers.
    const { data, setData, post, processing, errors } = useForm({
        security_code: '',
        sponsor_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('pending-members.update', user.id), {
            preserveState: true,
            // Inertia will detect the request and the controller should return a 204.
        });
    };

    return (
        <tr>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {user.id}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {user.first_name} {user.last_name}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {user.email}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {user.code_used}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                <input
                    type="text"
                    value={data.security_code}
                    onChange={(e) => setData('security_code', e.target.value)}
                    className="rounded border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.security_code && (
                    <div className="text-xs text-red-600">
                        {errors.security_code}
                    </div>
                )}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                <select
                    value={data.sponsor_id}
                    onChange={(e) => setData('sponsor_id', e.target.value)}
                    className="w-64 rounded border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a Parent</option>
                    {officialMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                            {member.first_name} {member.last_name}
                        </option>
                    ))}
                </select>
                {errors.sponsor_id && (
                    <div className="text-xs text-red-600">
                        {errors.sponsor_id}
                    </div>
                )}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm">
                <button
                    type="submit"
                    disabled={processing}
                    onClick={handleSubmit}
                    className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                >
                    Approve
                </button>
            </td>
        </tr>
    );
}
