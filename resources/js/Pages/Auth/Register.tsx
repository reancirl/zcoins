import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

// Extract sponsor_id from query parameters (if present)
const queryParams = new URLSearchParams(window.location.search);
const sponsorIdFromQuery = queryParams.get('sponsor_id') || '';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        sponsor_id: sponsorIdFromQuery, // Pre-populate sponsor_id if provided
        username: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        address: '',
        address2: '',
        province: '',
        city: '',
        zipcode: '',
        bank_name: '',
        account_name: '',
        account_number: '',
        activation_code: '',
        security_code: '',
        password: '',
        password_confirmation: '',
    });

    // State for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                {/* Sponsor ID */}
                <div>
                    <InputLabel htmlFor="sponsor_id" value="Sponsor ID" />
                    <TextInput
                        id="sponsor_id"
                        name="sponsor_id"
                        type="number"
                        value={data.sponsor_id}
                        readOnly={!!sponsorIdFromQuery} // Readonly if sponsor_id is provided via query param
                        className="mt-1 block w-full"
                        onChange={(e) => setData('sponsor_id', e.target.value)}
                    />
                    <InputError message={errors.sponsor_id} className="mt-2" />
                </div>

                {/* Username */}
                <div className="mt-4">
                    <InputLabel htmlFor="username" value="Username" />
                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('username', e.target.value)}
                        required
                    />
                    <InputError message={errors.username} className="mt-2" />
                </div>

                {/* First Name */}
                <div className="mt-4">
                    <InputLabel htmlFor="first_name" value="First Name" />
                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="given-name"
                        onChange={(e) => setData('first_name', e.target.value)}
                        required
                    />
                    <InputError message={errors.first_name} className="mt-2" />
                </div>

                {/* Middle Name */}
                <div className="mt-4">
                    <InputLabel htmlFor="middle_name" value="Middle Name" />
                    <TextInput
                        id="middle_name"
                        name="middle_name"
                        value={data.middle_name}
                        className="mt-1 block w-full"
                        autoComplete="additional-name"
                        onChange={(e) => setData('middle_name', e.target.value)}
                    />
                    <InputError message={errors.middle_name} className="mt-2" />
                </div>

                {/* Last Name */}
                <div className="mt-4">
                    <InputLabel htmlFor="last_name" value="Last Name" />
                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="family-name"
                        onChange={(e) => setData('last_name', e.target.value)}
                        required
                    />
                    <InputError message={errors.last_name} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Mobile Number */}
                <div className="mt-4">
                    <InputLabel htmlFor="mobile_number" value="Mobile Number" />
                    <TextInput
                        id="mobile_number"
                        name="mobile_number"
                        value={data.mobile_number}
                        className="mt-1 block w-full"
                        autoComplete="tel"
                        onChange={(e) =>
                            setData('mobile_number', e.target.value)
                        }
                    />
                    <InputError
                        message={errors.mobile_number}
                        className="mt-2"
                    />
                </div>

                {/* Address */}
                <div className="mt-4">
                    <InputLabel htmlFor="address" value="Address" />
                    <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        autoComplete="street-address"
                        onChange={(e) => setData('address', e.target.value)}
                    />
                    <InputError message={errors.address} className="mt-2" />
                </div>

                {/* Address 2 */}
                <div className="mt-4">
                    <InputLabel htmlFor="address2" value="Address 2" />
                    <TextInput
                        id="address2"
                        name="address2"
                        value={data.address2}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('address2', e.target.value)}
                    />
                    <InputError message={errors.address2} className="mt-2" />
                </div>

                {/* Province */}
                <div className="mt-4">
                    <InputLabel htmlFor="province" value="Province" />
                    <TextInput
                        id="province"
                        name="province"
                        value={data.province}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('province', e.target.value)}
                    />
                    <InputError message={errors.province} className="mt-2" />
                </div>

                {/* City */}
                <div className="mt-4">
                    <InputLabel htmlFor="city" value="City" />
                    <TextInput
                        id="city"
                        name="city"
                        value={data.city}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('city', e.target.value)}
                    />
                    <InputError message={errors.city} className="mt-2" />
                </div>

                {/* Zipcode */}
                <div className="mt-4">
                    <InputLabel htmlFor="zipcode" value="Zipcode" />
                    <TextInput
                        id="zipcode"
                        name="zipcode"
                        value={data.zipcode}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('zipcode', e.target.value)}
                    />
                    <InputError message={errors.zipcode} className="mt-2" />
                </div>

                {/* Bank Name */}
                <div className="mt-4">
                    <InputLabel htmlFor="bank_name" value="Bank Name" />
                    <TextInput
                        id="bank_name"
                        name="bank_name"
                        value={data.bank_name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('bank_name', e.target.value)}
                    />
                    <InputError message={errors.bank_name} className="mt-2" />
                </div>

                {/* Account Name */}
                <div className="mt-4">
                    <InputLabel htmlFor="account_name" value="Account Name" />
                    <TextInput
                        id="account_name"
                        name="account_name"
                        value={data.account_name}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData('account_name', e.target.value)
                        }
                    />
                    <InputError
                        message={errors.account_name}
                        className="mt-2"
                    />
                </div>

                {/* Account Number */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="account_number"
                        value="Account Number"
                    />
                    <TextInput
                        id="account_number"
                        name="account_number"
                        value={data.account_number}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData('account_number', e.target.value)
                        }
                    />
                    <InputError
                        message={errors.account_number}
                        className="mt-2"
                    />
                </div>

                {/* Activation Code */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="activation_code"
                        value="Activation Code"
                    />
                    <TextInput
                        id="activation_code"
                        name="activation_code"
                        value={data.activation_code}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        onChange={(e) =>
                            setData('activation_code', e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={errors.activation_code}
                        className="mt-2"
                    />
                </div>

                {/* Security Code */}
                <div className="mt-4">
                    <InputLabel htmlFor="security_code" value="Security Code" />
                    <TextInput
                        id="security_code"
                        name="security_code"
                        value={data.security_code}
                        className="mt-1 block w-full"
                        autoComplete="one-time-code"
                        onChange={(e) =>
                            setData('security_code', e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={errors.security_code}
                        className="mt-2"
                    />
                </div>

                {/* Password Field with Reveal Toggle */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full pr-10"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                        >
                            {showPassword ? (
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
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.395-3.39M6.88 6.88A9.971 9.971 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.21 2.298M15 12a3 3 0 00-3-3m0 0a3 3 0 00-2.121 5.121M12 9v3m0 0v3m0-3h3m-3 0H9"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3l18 18"
                                    />
                                </svg>
                            ) : (
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
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Password Confirmation Field with Reveal Toggle */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            type={
                                showPasswordConfirmation ? 'text' : 'password'
                            }
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full pr-10"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowPasswordConfirmation(
                                    !showPasswordConfirmation,
                                )
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                        >
                            {showPasswordConfirmation ? (
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
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.395-3.39M6.88 6.88A9.971 9.971 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.21 2.298M15 12a3 3 0 00-3-3m0 0a3 3 0 00-2.121 5.121M12 9v3m0 0v3m0-3h3m-3 0H9"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3l18 18"
                                    />
                                </svg>
                            ) : (
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
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
