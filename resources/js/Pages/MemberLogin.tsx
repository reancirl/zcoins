import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface MemberLoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function MemberLogin({
    status,
    canResetPassword,
}: MemberLoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('member-login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Member Login" />

            <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
                {/* LEFT COLUMN (Login Form) */}
                <div className="flex w-full flex-col justify-center bg-white p-8 md:w-1/2 md:p-16">
                    <div className="mx-auto w-full max-w-sm">
                        <h2 className="mb-2 text-center text-2xl font-bold">
                            Member Login
                        </h2>
                        <p className="mb-6 text-center text-sm text-gray-500">
                            Sign in to use Zillion Planet Portal
                        </p>

                        {status && (
                            <div className="mb-4 text-center text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email or Username */}
                            <div>
                                <InputLabel
                                    htmlFor="login"
                                    value="Email or Username"
                                />
                                <TextInput
                                    id="login"
                                    name="login"
                                    type="text"
                                    value={data.login}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    autoComplete="username"
                                    isFocused
                                    onChange={(e) =>
                                        setData('login', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.login}
                                    className="mt-2"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        value={data.password}
                                        className="mt-1 block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-3 flex items-center focus:outline-none"
                                    >
                                        {showPassword ? (
                                            /* Eye Off Icon */
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 
                                                       10.05 0 012.395-3.39M6.88 6.88A9.971 9.971 0 0112 5c4.477 0 8.268 2.943 9.542 
                                                       7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 3l18 18"
                                                />
                                            </svg>
                                        ) : (
                                            /* Eye Icon */
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 
                                                       0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 
                                                       7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                                <PrimaryButton
                                    className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none"
                                    disabled={processing}
                                >
                                    Log in
                                </PrimaryButton>
                            </div>
                        </form>
                        <p className="mt-8 text-center text-xs text-gray-400">
                            @ Zillion Planet 2025
                        </p>
                    </div>
                </div>

                {/* RIGHT COLUMN (Image/Branding) */}
                <div className="relative hidden h-auto w-full md:block md:w-1/2">
                    <img
                        src="/img/z_login_img.jpg"
                        alt="Login Banner"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </>
    );
}
