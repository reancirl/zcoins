import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

interface SystemSettingsProps {
    settings: {
        id?: number;
        zcoins_value_to_php: number;
        default_currency: string;
    };
}

export default function SystemSettings({ settings }: SystemSettingsProps) {
    // Initialize the form with the current settings.
    const { data, setData, post, processing, errors } = useForm({
        zcoins_value_to_php: settings.zcoins_value_to_php || 60,
        default_currency: settings.default_currency || 'PHP',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('system-settings.update'));
    };

    // Update the form data if the settings prop changes.
    useEffect(() => {
        setData({
            zcoins_value_to_php: settings.zcoins_value_to_php || 60,
            default_currency: settings.default_currency || 'PHP',
        });
    }, [settings, setData]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    System Settings
                </h2>
            }
        >
            <Head title="System Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div>
                                <label
                                    htmlFor="zcoins_value_to_php"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Zcoins Conversion Rate (PHP per Zcoin)
                                </label>
                                <input
                                    id="zcoins_value_to_php"
                                    type="number"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.zcoins_value_to_php}
                                    onChange={(e) =>
                                        setData(
                                            'zcoins_value_to_php',
                                            parseInt(e.target.value),
                                        )
                                    }
                                    required
                                />
                                {errors.zcoins_value_to_php && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.zcoins_value_to_php}
                                    </p>
                                )}
                            </div>

                            <div className="mt-4">
                                <label
                                    htmlFor="default_currency"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Default Currency Code
                                </label>
                                <input
                                    id="default_currency"
                                    type="text"
                                    maxLength={3}
                                    readOnly
                                    className="mt-1 block w-full cursor-not-allowed rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.default_currency}
                                />
                                {errors.default_currency && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.default_currency}
                                    </p>
                                )}
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Save Settings
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
