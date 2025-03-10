import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { PageProps } from '@/types'; // Adjust the import path accordingly
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

interface SharedProps extends PageProps {
    flash: {
        success?: string;
        error?: string;
    };
}

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    // Now use the SharedProps type
    const { auth, flash } = usePage<SharedProps>().props;
    const user = auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link
                                    href="/"
                                    className="text-xl font-extrabold"
                                >
                                    ZPlanet
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    href={route('transactions')}
                                    active={route().current('transactions')}
                                >
                                    Transactions
                                </NavLink>

                                {user && !user.is_admin && (
                                    <NavLink
                                        href={route('downlines')}
                                        active={route().current('downlines')}
                                    >
                                        Downlines
                                    </NavLink>
                                )}

                                {user && user.is_admin && (
                                    <NavLink
                                        href={route('activation-codes')}
                                        active={route().current(
                                            'activation-codes',
                                        )}
                                    >
                                        Activation Codes
                                    </NavLink>
                                )}

                                {user && user.is_admin && (
                                    <NavLink
                                        href={route('members')}
                                        active={route().current('members')}
                                    >
                                        Members
                                    </NavLink>
                                )}

                                {user && user.is_admin && (
                                    <NavLink
                                        href={route('activation-codes.history')}
                                        active={route().current(
                                            'activation-codes.history',
                                        )}
                                    >
                                        History - Activation Codes
                                    </NavLink>
                                )}

                                {user && !user.is_admin && (
                                    <NavLink
                                        href={route('genealogy')}
                                        active={route().current('genealogy')}
                                    >
                                        Genealogy
                                    </NavLink>
                                )}

                                <NavLink
                                    href={route('qr')}
                                    active={route().current('qr')}
                                >
                                    QR Code
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.first_name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        {user && user.is_admin && (
                                            <Dropdown.Link
                                                href={route(
                                                    'system-settings.index',
                                                )}
                                            >
                                                System Settings
                                            </Dropdown.Link>
                                        )}
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="border-t border-gray-200 px-4 pb-3 pt-4">
                        <div className="space-y-1">
                            <ResponsiveNavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route('transactions')}
                                active={route().current('transactions')}
                            >
                                Transactions
                            </ResponsiveNavLink>
                            {user && !user.is_admin && (
                                <ResponsiveNavLink
                                    href={route('downlines')}
                                    active={route().current('downlines')}
                                >
                                    Downlines
                                </ResponsiveNavLink>
                            )}
                            {user && user.is_admin && (
                                <ResponsiveNavLink
                                    href={route('activation-codes')}
                                    active={route().current('activation-codes')}
                                >
                                    Activation Codes
                                </ResponsiveNavLink>
                            )}
                            {user && user.is_admin && (
                                <ResponsiveNavLink
                                    href={route('members')}
                                    active={route().current('members')}
                                >
                                    Members
                                </ResponsiveNavLink>
                            )}
                            {user && user.is_admin && (
                                <ResponsiveNavLink
                                    href={route('activation-codes.history')}
                                    active={route().current(
                                        'activation-codes.history',
                                    )}
                                >
                                    History - Activation Codes
                                </ResponsiveNavLink>
                            )}
                            {user && !user.is_admin && (
                                <ResponsiveNavLink
                                    href={route('genealogy')}
                                    active={route().current('genealogy')}
                                >
                                    Genealogy
                                </ResponsiveNavLink>
                            )}
                            <ResponsiveNavLink
                                href={route('qr')}
                                active={route().current('qr')}
                            >
                                QR Code
                            </ResponsiveNavLink>
                        </div>

                        <div className="border-t border-gray-200 pb-1 pt-4">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800">
                                    {user.first_name}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Flash messages */}
            {flash.success && (
                <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
                        role="alert"
                    >
                        <strong className="font-bold">Success: </strong>
                        <span className="block sm:inline">{flash.success}</span>
                    </div>
                </div>
            )}
            {flash.error && (
                <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                        role="alert"
                    >
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{flash.error}</span>
                    </div>
                </div>
            )}

            <main>{children}</main>
        </div>
    );
}
