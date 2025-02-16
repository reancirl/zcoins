import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    // Retrieve the auth object from Inertia's shared props.
    const { auth } = usePage().props;
    const user = auth.user;

    // Determine a welcome message based on the user's role and status.
    let welcomeMessage = "You're logged in!";
    if (user.is_admin) {
        welcomeMessage = 'Welcome back, Admin!';
    } else if (!user.official_member) {
        welcomeMessage = 'Your account needs to be verified.';
    } else {
        welcomeMessage = 'Welcome back!';
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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {welcomeMessage}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
