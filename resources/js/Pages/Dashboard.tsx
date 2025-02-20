import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    // Retrieve the auth object from Inertia's shared props.
    const { auth } = usePage().props;
    const user = auth.user;

    // Assume the backend attaches a computed field "net_zcoins" to the user.
    // If not available, default to 0.
    const availableBalance = user.net_zcoins ?? 0;

    let welcomeMessage = "You're logged in!";
    if (user.is_admin) {
        welcomeMessage = 'Welcome back, Admin!';
    } else {
        welcomeMessage = 'Welcome to ZPLANET PORTAL!';
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                            <div className="text-lg font-semibold text-gray-900">
                                {welcomeMessage}
                            </div>
                        </div>
                        <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                            <h3 className="text-xl font-bold text-gray-800">
                                Available Balance
                            </h3>
                            <p className="mt-2 text-3xl text-indigo-600">
                                {availableBalance.toFixed(2)} ZCoins
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
