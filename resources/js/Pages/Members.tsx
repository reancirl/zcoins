import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface Member {
    member_id: number;
    first_name: string;
    last_name: string;
    email: string;
    sponsor: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface MembersPaginated {
    data: Member[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface MembersProps {
    members: MembersPaginated;
    filters: {
        search?: string;
    };
}

export default function Members({ members, filters }: MembersProps) {
    // For search functionality:
    const { data, setData, get } = useForm({
        search: filters.search || '',
    });

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // Using the route name 'members'
        get(route('members'), {
            preserveState: true,
            replace: true,
        });
    };

    // For archiving functionality:
    const [archivingMember, setArchivingMember] = useState<Member | null>(null);
    const {
        data: archiveData,
        setData: setArchiveData,
        post: postArchive,
        reset: resetArchive,
        processing: processingArchive,
    } = useForm({
        reason: '',
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Members
                </h2>
            }
        >
            <Head title="Members" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Search Form */}
                    <form onSubmit={submit} className="mb-6 flex">
                        <input
                            type="text"
                            name="search"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            placeholder="Search by first or last name"
                            className="w-full rounded-l-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            className="rounded-r-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none"
                        >
                            Search
                        </button>
                    </form>

                    {members.data.length === 0 ? (
                        <div className="rounded bg-white p-4 shadow">
                            No members found.
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
                                            Sponsor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {members.data.map((member) => (
                                        <tr key={member.member_id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {member.member_id}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                {member.first_name}{' '}
                                                {member.last_name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                {member.email}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                {member.sponsor || '—'}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                <button
                                                    onClick={() =>
                                                        setArchivingMember(
                                                            member,
                                                        )
                                                    }
                                                    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                                >
                                                    Archive
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {members.links.length > 1 && (
                        <div className="mt-4 flex justify-center">
                            {members.links.map((link, index) => (
                                <span key={index}>
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            preserveState={true}
                                            className={`mx-1 inline-block rounded px-3 py-1 text-sm ${
                                                link.active
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-gray-200 text-gray-700'
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        ></Link>
                                    ) : (
                                        <span
                                            className="mx-1 inline-block rounded px-3 py-1 text-sm text-gray-400"
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        ></span>
                                    )}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Archive Modal */}
            {archivingMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h3 className="mb-4 text-lg font-bold">
                            Archive Member
                        </h3>
                        <p className="mb-4">
                            Please provide a reason for archiving{' '}
                            <span className="font-medium">
                                {archivingMember.first_name}{' '}
                                {archivingMember.last_name}
                            </span>
                            .
                        </p>
                        <textarea
                            value={archiveData.reason}
                            onChange={(e) =>
                                setArchiveData('reason', e.target.value)
                            }
                            className="mb-4 w-full rounded-md border border-gray-300 p-2"
                            placeholder="Enter reason..."
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    resetArchive();
                                    setArchivingMember(null);
                                }}
                                className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    postArchive(
                                        route(
                                            'members.archive',
                                            archivingMember.member_id,
                                        ),
                                        {
                                            onSuccess: () => {
                                                resetArchive();
                                                setArchivingMember(null);
                                            },
                                        },
                                    );
                                }}
                                className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                disabled={processingArchive}
                            >
                                Archive
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
