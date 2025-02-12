import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Define the shape of an ActivationCode
interface ActivationCode {
    id: number;
    code: string;
    active: boolean;
    created_at: string;
}

// Define the props for the ActivationCodes component
interface ActivationCodesProps {
    activationCodes: ActivationCode[];
}

export default function ActivationCodes({
    activationCodes,
}: ActivationCodesProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Activation Codes
                </h2>
            }
        >
            <Head title="Activation Codes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left">
                                            Code
                                        </th>
                                        <th className="px-6 py-3 text-left">
                                            Active
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {activationCodes.map((code) => (
                                        <tr key={code.id}>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {code.id}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {code.code}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {code.active ? 'Yes' : 'No'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
