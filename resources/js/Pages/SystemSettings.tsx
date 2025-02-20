import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

interface SystemSettingsProps {
    settings: {
        id?: number;
        zcoins_value_to_php: number;
        default_currency: string;
        membership_fee_php: number;
        direct_referral_bonus_php: number;
        buy_zcoins_interest_percent: number;
        buy_zcoins_daily_interest_for_late_payment_percent: number;
        deduction_for_processing_fee_php: number;
        lock_20_zcoins_unlock_count: number;
        lock_60_zcoins_unlock_count: number;
        lock_100_zcoins_unlock_count: number;
        lock_200_zcoins_unlock_count: number;
        lock_400_zcoins_unlock_count: number;
        lock_1000_zcoins_unlock_count: number;
        sell_zcoins_charge_percent: number;
        deduction_for_zcare_php: number;
        rebates_cashback_percent: number;
        duplication_bonus_level_1: number;
        duplication_bonus_level_2: number;
        duplication_bonus_level_3: number;
        duplication_bonus_level_4: number;
        duplication_bonus_level_5: number;
        duplication_bonus_level_6: number;
        duplication_bonus_level_7: number;
        duplication_bonus_level_8: number;
        duplication_bonus_level_9: number;
        duplication_bonus_level_10: number;
        duplication_bonus_level_11: number;
        duplication_bonus_level_12: number;
        incentives_percent_level_1: string;
        incentives_percent_level_2: string;
        incentives_percent_level_3: string;
        incentives_percent_level_4: string;
        incentives_percent_level_5: string;
        incentives_percent_level_6: string;
        incentives_percent_level_7: string;
        incentives_percent_level_8: string;
        incentives_percent_level_9: string;
        incentives_percent_level_10: string;
        incentives_percent_level_11: string;
        incentives_percent_level_12: string;
        patronage_bonus_level_1: number;
        patronage_bonus_level_2: number;
        patronage_bonus_level_3: number;
        patronage_bonus_level_4: number;
        patronage_bonus_level_5: number;
        patronage_bonus_level_6: number;
        patronage_bonus_level_7: number;
        patronage_bonus_level_8: number;
        patronage_bonus_level_9: number;
        patronage_bonus_level_10: number;
        patronage_bonus_level_11: number;
        patronage_bonus_level_12: number;
    };
}

const tabs = [
    { id: 'general', label: 'General' },
    { id: 'referral', label: 'Referral Settings' },
    { id: 'lock', label: 'Lock Direct Referral Counts' },
    { id: 'selling', label: 'Selling & Deductions' },
    { id: 'duplication', label: 'Duplication Bonus (12 Levels)' },
    { id: 'incentives', label: 'Incentives (12 Levels)' },
    { id: 'patronage', label: 'Patronage Bonus (12 Levels)' },
];

export default function SystemSettings({ settings }: SystemSettingsProps) {
    // Initialize the form with all settings.
    const { data, setData, post, processing, errors } = useForm({
        zcoins_value_to_php: settings.zcoins_value_to_php || 60,
        default_currency: settings.default_currency || 'PHP',
        membership_fee_php: settings.membership_fee_php || 500,
        direct_referral_bonus_php: settings.direct_referral_bonus_php || 0,
        buy_zcoins_interest_percent: settings.buy_zcoins_interest_percent || 0,
        buy_zcoins_daily_interest_for_late_payment_percent:
            settings.buy_zcoins_daily_interest_for_late_payment_percent || 0,
        deduction_for_processing_fee_php:
            settings.deduction_for_processing_fee_php || 0,
        lock_20_zcoins_unlock_count: settings.lock_20_zcoins_unlock_count || 3,
        lock_60_zcoins_unlock_count: settings.lock_60_zcoins_unlock_count || 10,
        lock_100_zcoins_unlock_count:
            settings.lock_100_zcoins_unlock_count || 15,
        lock_200_zcoins_unlock_count:
            settings.lock_200_zcoins_unlock_count || 15,
        lock_400_zcoins_unlock_count:
            settings.lock_400_zcoins_unlock_count || 125,
        lock_1000_zcoins_unlock_count:
            settings.lock_1000_zcoins_unlock_count || 200,
        sell_zcoins_charge_percent: settings.sell_zcoins_charge_percent || 0,
        deduction_for_zcare_php: settings.deduction_for_zcare_php || 0,
        rebates_cashback_percent: settings.rebates_cashback_percent || 0,
        duplication_bonus_level_1: settings.duplication_bonus_level_1 || 0,
        duplication_bonus_level_2: settings.duplication_bonus_level_2 || 0,
        duplication_bonus_level_3: settings.duplication_bonus_level_3 || 0,
        duplication_bonus_level_4: settings.duplication_bonus_level_4 || 0,
        duplication_bonus_level_5: settings.duplication_bonus_level_5 || 0,
        duplication_bonus_level_6: settings.duplication_bonus_level_6 || 0,
        duplication_bonus_level_7: settings.duplication_bonus_level_7 || 0,
        duplication_bonus_level_8: settings.duplication_bonus_level_8 || 0,
        duplication_bonus_level_9: settings.duplication_bonus_level_9 || 0,
        duplication_bonus_level_10: settings.duplication_bonus_level_10 || 0,
        duplication_bonus_level_11: settings.duplication_bonus_level_11 || 0,
        duplication_bonus_level_12: settings.duplication_bonus_level_12 || 0,
        incentives_percent_level_1:
            settings.incentives_percent_level_1 || 'Not Indicated',
        incentives_percent_level_2:
            settings.incentives_percent_level_2 || 'Not Indicated',
        incentives_percent_level_3:
            settings.incentives_percent_level_3 || 'Not Indicated',
        incentives_percent_level_4:
            settings.incentives_percent_level_4 || 'Not Indicated',
        incentives_percent_level_5:
            settings.incentives_percent_level_5 || 'Not Indicated',
        incentives_percent_level_6:
            settings.incentives_percent_level_6 || 'Not Indicated',
        incentives_percent_level_7:
            settings.incentives_percent_level_7 || 'Not Indicated',
        incentives_percent_level_8:
            settings.incentives_percent_level_8 || 'Not Indicated',
        incentives_percent_level_9:
            settings.incentives_percent_level_9 || 'Not Indicated',
        incentives_percent_level_10:
            settings.incentives_percent_level_10 || 'Not Indicated',
        incentives_percent_level_11:
            settings.incentives_percent_level_11 || 'Not Indicated',
        incentives_percent_level_12:
            settings.incentives_percent_level_12 || 'Not Indicated',
        patronage_bonus_level_1: settings.patronage_bonus_level_1 || 0,
        patronage_bonus_level_2: settings.patronage_bonus_level_2 || 0,
        patronage_bonus_level_3: settings.patronage_bonus_level_3 || 0,
        patronage_bonus_level_4: settings.patronage_bonus_level_4 || 0,
        patronage_bonus_level_5: settings.patronage_bonus_level_5 || 0,
        patronage_bonus_level_6: settings.patronage_bonus_level_6 || 0,
        patronage_bonus_level_7: settings.patronage_bonus_level_7 || 0,
        patronage_bonus_level_8: settings.patronage_bonus_level_8 || 0,
        patronage_bonus_level_9: settings.patronage_bonus_level_9 || 0,
        patronage_bonus_level_10: settings.patronage_bonus_level_10 || 0,
        patronage_bonus_level_11: settings.patronage_bonus_level_11 || 0,
        patronage_bonus_level_12: settings.patronage_bonus_level_12 || 0,
    });

    const [activeTab, setActiveTab] = useState('general');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('system-settings.update'));
    };

    useEffect(() => {
        setData({
            zcoins_value_to_php: settings.zcoins_value_to_php || 60,
            default_currency: settings.default_currency || 'PHP',
            membership_fee_php: settings.membership_fee_php || 60,
            direct_referral_bonus_php: settings.direct_referral_bonus_php || 0,
            buy_zcoins_interest_percent:
                settings.buy_zcoins_interest_percent || 0,
            buy_zcoins_daily_interest_for_late_payment_percent:
                settings.buy_zcoins_daily_interest_for_late_payment_percent ||
                0,
            deduction_for_processing_fee_php:
                settings.deduction_for_processing_fee_php || 0,
            lock_20_zcoins_unlock_count:
                settings.lock_20_zcoins_unlock_count || 3,
            lock_60_zcoins_unlock_count:
                settings.lock_60_zcoins_unlock_count || 10,
            lock_100_zcoins_unlock_count:
                settings.lock_100_zcoins_unlock_count || 15,
            lock_200_zcoins_unlock_count:
                settings.lock_200_zcoins_unlock_count || 15,
            lock_400_zcoins_unlock_count:
                settings.lock_400_zcoins_unlock_count || 125,
            lock_1000_zcoins_unlock_count:
                settings.lock_1000_zcoins_unlock_count || 200,
            sell_zcoins_charge_percent:
                settings.sell_zcoins_charge_percent || 0,
            deduction_for_zcare_php: settings.deduction_for_zcare_php || 0,
            rebates_cashback_percent: settings.rebates_cashback_percent || 0,
            duplication_bonus_level_1: settings.duplication_bonus_level_1 || 0,
            duplication_bonus_level_2: settings.duplication_bonus_level_2 || 0,
            duplication_bonus_level_3: settings.duplication_bonus_level_3 || 0,
            duplication_bonus_level_4: settings.duplication_bonus_level_4 || 0,
            duplication_bonus_level_5: settings.duplication_bonus_level_5 || 0,
            duplication_bonus_level_6: settings.duplication_bonus_level_6 || 0,
            duplication_bonus_level_7: settings.duplication_bonus_level_7 || 0,
            duplication_bonus_level_8: settings.duplication_bonus_level_8 || 0,
            duplication_bonus_level_9: settings.duplication_bonus_level_9 || 0,
            duplication_bonus_level_10:
                settings.duplication_bonus_level_10 || 0,
            duplication_bonus_level_11:
                settings.duplication_bonus_level_11 || 0,
            duplication_bonus_level_12:
                settings.duplication_bonus_level_12 || 0,
            incentives_percent_level_1:
                settings.incentives_percent_level_1 || 'Not Indicated',
            incentives_percent_level_2:
                settings.incentives_percent_level_2 || 'Not Indicated',
            incentives_percent_level_3:
                settings.incentives_percent_level_3 || 'Not Indicated',
            incentives_percent_level_4:
                settings.incentives_percent_level_4 || 'Not Indicated',
            incentives_percent_level_5:
                settings.incentives_percent_level_5 || 'Not Indicated',
            incentives_percent_level_6:
                settings.incentives_percent_level_6 || 'Not Indicated',
            incentives_percent_level_7:
                settings.incentives_percent_level_7 || 'Not Indicated',
            incentives_percent_level_8:
                settings.incentives_percent_level_8 || 'Not Indicated',
            incentives_percent_level_9:
                settings.incentives_percent_level_9 || 'Not Indicated',
            incentives_percent_level_10:
                settings.incentives_percent_level_10 || 'Not Indicated',
            incentives_percent_level_11:
                settings.incentives_percent_level_11 || 'Not Indicated',
            incentives_percent_level_12:
                settings.incentives_percent_level_12 || 'Not Indicated',
            patronage_bonus_level_1: settings.patronage_bonus_level_1 || 0,
            patronage_bonus_level_2: settings.patronage_bonus_level_2 || 0,
            patronage_bonus_level_3: settings.patronage_bonus_level_3 || 0,
            patronage_bonus_level_4: settings.patronage_bonus_level_4 || 0,
            patronage_bonus_level_5: settings.patronage_bonus_level_5 || 0,
            patronage_bonus_level_6: settings.patronage_bonus_level_6 || 0,
            patronage_bonus_level_7: settings.patronage_bonus_level_7 || 0,
            patronage_bonus_level_8: settings.patronage_bonus_level_8 || 0,
            patronage_bonus_level_9: settings.patronage_bonus_level_9 || 0,
            patronage_bonus_level_10: settings.patronage_bonus_level_10 || 0,
            patronage_bonus_level_11: settings.patronage_bonus_level_11 || 0,
            patronage_bonus_level_12: settings.patronage_bonus_level_12 || 0,
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
                    {/* Tab Navigation */}
                    <div className="mb-4 border-b border-gray-200">
                        <nav
                            className="-mb-px flex space-x-8"
                            aria-label="Tabs"
                        >
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium focus:outline-none ${
                                        activeTab === tab.id
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <form onSubmit={submit}>
                        {/* General Settings */}
                        {activeTab === 'general' && (
                            <div className="mt-6">
                                <h3 className="mb-4 text-lg font-semibold">
                                    General Settings
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <label
                                            htmlFor="zcoins_value_to_php"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Zcoins Conversion Rate (PHP per
                                            Zcoin)
                                        </label>
                                        <input
                                            id="zcoins_value_to_php"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.zcoins_value_to_php}
                                            onChange={(e) =>
                                                setData(
                                                    'zcoins_value_to_php',
                                                    parseFloat(e.target.value),
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
                                    <div>
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
                                            className="mt-1 block w-full cursor-not-allowed rounded-md border-gray-300 bg-gray-200 shadow-sm"
                                            value={data.default_currency}
                                        />
                                        {errors.default_currency && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.default_currency}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="membership_fee_php"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Membership Fee (PHP)
                                        </label>
                                        <input
                                            id="membership_fee_php"
                                            type="number"
                                            step="0.01"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.membership_fee_php}
                                            onChange={(e) =>
                                                setData(
                                                    'membership_fee_php',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                            required
                                        />
                                        {errors.membership_fee_php && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.membership_fee_php}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Referral Settings */}
                        {activeTab === 'referral' && (
                            <div className="mt-6">
                                <h3 className="mb-4 text-lg font-semibold">
                                    Referral Settings
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="direct_referral_bonus_php"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Direct Referral Bonus (PHP)
                                        </label>
                                        <input
                                            id="direct_referral_bonus_php"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={
                                                data.direct_referral_bonus_php
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'direct_referral_bonus_php',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.direct_referral_bonus_php && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors.direct_referral_bonus_php
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="buy_zcoins_interest_percent"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Buy ZCoins Interest (%)
                                        </label>
                                        <input
                                            id="buy_zcoins_interest_percent"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={
                                                data.buy_zcoins_interest_percent
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'buy_zcoins_interest_percent',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.buy_zcoins_interest_percent && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors.buy_zcoins_interest_percent
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="buy_zcoins_daily_interest_for_late_payment_percent"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Daily Interest for Late Payment (%)
                                        </label>
                                        <input
                                            id="buy_zcoins_daily_interest_for_late_payment_percent"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={
                                                data.buy_zcoins_daily_interest_for_late_payment_percent
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'buy_zcoins_daily_interest_for_late_payment_percent',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.buy_zcoins_daily_interest_for_late_payment_percent && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors.buy_zcoins_daily_interest_for_late_payment_percent
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="deduction_for_processing_fee_php"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Deduction for Processing Fee (PHP)
                                        </label>
                                        <input
                                            id="deduction_for_processing_fee_php"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={
                                                data.deduction_for_processing_fee_php
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'deduction_for_processing_fee_php',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.deduction_for_processing_fee_php && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors.deduction_for_processing_fee_php
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Lock Direct Referral Counts */}
                        {activeTab === 'lock' && (
                            <div className="mt-6">
                                <h3 className="mb-2 text-lg font-medium">
                                    Lock Direct Referral Counts
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="lock_20_zcoins_unlock_count"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            20 ZCoins Lock Unlock Count
                                        </label>
                                        <input
                                            id="lock_20_zcoins_unlock_count"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={
                                                data.lock_20_zcoins_unlock_count
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'lock_20_zcoins_unlock_count',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.lock_20_zcoins_unlock_count && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors.lock_20_zcoins_unlock_count
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="lock_60_zcoins_unlock_count"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            60 ZCoins Lock Unlock Count
                                        </label>
                                        <input
                                            id="lock_60_zcoins_unlock_count"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={
                                                data.lock_60_zcoins_unlock_count
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'lock_60_zcoins_unlock_count',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.lock_60_zcoins_unlock_count && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors.lock_60_zcoins_unlock_count
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="lock_100_zcoins_unlock_count"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            100 ZCoins Lock Unlock Count
                                        </label>
                                        <input
                                            id="lock_100_zcoins_unlock_count"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={
                                                data.lock_100_zcoins_unlock_count
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'lock_100_zcoins_unlock_count',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.lock_100_zcoins_unlock_count && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors.lock_100_zcoins_unlock_count
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="lock_200_zcoins_unlock_count"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            200 ZCoins Lock Unlock Count
                                        </label>
                                        <input
                                            id="lock_200_zcoins_unlock_count"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={
                                                data.lock_200_zcoins_unlock_count
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'lock_200_zcoins_unlock_count',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.lock_200_zcoins_unlock_count && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors.lock_200_zcoins_unlock_count
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="lock_400_zcoins_unlock_count"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            400 ZCoins Lock Unlock Count
                                        </label>
                                        <input
                                            id="lock_400_zcoins_unlock_count"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={
                                                data.lock_400_zcoins_unlock_count
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'lock_400_zcoins_unlock_count',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.lock_400_zcoins_unlock_count && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors.lock_400_zcoins_unlock_count
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="lock_1000_zcoins_unlock_count"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            1000 ZCoins Lock Unlock Count
                                        </label>
                                        <input
                                            id="lock_1000_zcoins_unlock_count"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={
                                                data.lock_1000_zcoins_unlock_count
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'lock_1000_zcoins_unlock_count',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.lock_1000_zcoins_unlock_count && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors.lock_1000_zcoins_unlock_count
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Selling & Deductions */}
                        {activeTab === 'selling' && (
                            <div className="mt-6">
                                <h3 className="mb-2 text-lg font-medium">
                                    Selling & Deductions
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <label
                                            htmlFor="sell_zcoins_charge_percent"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Charge for Selling ZCoins (%)
                                        </label>
                                        <input
                                            id="sell_zcoins_charge_percent"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={
                                                data.sell_zcoins_charge_percent
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'sell_zcoins_charge_percent',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.sell_zcoins_charge_percent && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors.sell_zcoins_charge_percent
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="deduction_for_zcare_php"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Deduction for ZCare (PHP)
                                        </label>
                                        <input
                                            id="deduction_for_zcare_php"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.deduction_for_zcare_php}
                                            onChange={(e) =>
                                                setData(
                                                    'deduction_for_zcare_php',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.deduction_for_zcare_php && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.deduction_for_zcare_php}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="rebates_cashback_percent"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Rebates/Cashback (%)
                                        </label>
                                        <input
                                            id="rebates_cashback_percent"
                                            type="number"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={
                                                data.rebates_cashback_percent
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'rebates_cashback_percent',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                        />
                                        {errors.rebates_cashback_percent && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors.rebates_cashback_percent
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Duplication Bonus */}
                        {activeTab === 'duplication' && (
                            <div className="mt-6">
                                <h3 className="mb-2 text-lg font-medium">
                                    Duplication Bonus (Indirect Referral Bonus)
                                    in ZCoins (12 Levels)
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    {[...Array(12)].map((_, i) => {
                                        const level = i + 1;
                                        return (
                                            <div
                                                key={`duplication_bonus_level_${level}`}
                                            >
                                                <label
                                                    htmlFor={`duplication_bonus_level_${level}`}
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Level {level}
                                                </label>
                                                <input
                                                    id={`duplication_bonus_level_${level}`}
                                                    type="number"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    value={
                                                        (
                                                            data as unknown as Record<
                                                                string,
                                                                never
                                                            >
                                                        )[
                                                            `duplication_bonus_level_${level}`
                                                        ]
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            `duplication_bonus_level_${level}` as keyof typeof data,
                                                            parseFloat(
                                                                e.target.value,
                                                            ),
                                                        )
                                                    }
                                                />
                                                {(
                                                    errors as Record<
                                                        string,
                                                        never
                                                    >
                                                )[
                                                    `duplication_bonus_level_${level}`
                                                ] && (
                                                    <p className="mt-2 text-sm text-red-600">
                                                        {
                                                            (
                                                                errors as Record<
                                                                    string,
                                                                    never
                                                                >
                                                            )[
                                                                `duplication_bonus_level_${level}`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Incentives */}
                        {activeTab === 'incentives' && (
                            <div className="mt-6">
                                <h3 className="mb-2 text-lg font-medium">
                                    Incentives (%) (12 Levels)
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    {[...Array(12)].map((_, i) => {
                                        const level = i + 1;
                                        return (
                                            <div
                                                key={`incentives_percent_level_${level}`}
                                            >
                                                <label
                                                    htmlFor={`incentives_percent_level_${level}`}
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Level {level}
                                                </label>
                                                <input
                                                    id={`incentives_percent_level_${level}`}
                                                    type="text"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    value={
                                                        (
                                                            data as unknown as Record<
                                                                string,
                                                                string
                                                            >
                                                        )[
                                                            `incentives_percent_level_${level}`
                                                        ]
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            `incentives_percent_level_${level}` as keyof typeof data,
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {(
                                                    errors as Record<
                                                        string,
                                                        never
                                                    >
                                                )[
                                                    `incentives_percent_level_${level}`
                                                ] && (
                                                    <p className="mt-2 text-sm text-red-600">
                                                        {
                                                            (
                                                                errors as Record<
                                                                    string,
                                                                    never
                                                                >
                                                            )[
                                                                `incentives_percent_level_${level}`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Patronage Bonus */}
                        {activeTab === 'patronage' && (
                            <div className="mt-6">
                                <h3 className="mb-2 text-lg font-medium">
                                    Patronage Bonus in ZCoins (12 Levels)
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    {[...Array(12)].map((_, i) => {
                                        const level = i + 1;
                                        return (
                                            <div
                                                key={`patronage_bonus_level_${level}`}
                                            >
                                                <label
                                                    htmlFor={`patronage_bonus_level_${level}`}
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Level {level}
                                                </label>
                                                <input
                                                    id={`patronage_bonus_level_${level}`}
                                                    type="number"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    value={
                                                        (
                                                            data as unknown as Record<
                                                                string,
                                                                never
                                                            >
                                                        )[
                                                            `patronage_bonus_level_${level}`
                                                        ]
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            `patronage_bonus_level_${level}` as keyof typeof data,
                                                            parseFloat(
                                                                e.target.value,
                                                            ),
                                                        )
                                                    }
                                                />
                                                {(
                                                    errors as Record<
                                                        string,
                                                        never
                                                    >
                                                )[
                                                    `patronage_bonus_level_${level}`
                                                ] && (
                                                    <p className="mt-2 text-sm text-red-600">
                                                        {
                                                            (
                                                                errors as Record<
                                                                    string,
                                                                    never
                                                                >
                                                            )[
                                                                `patronage_bonus_level_${level}`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

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
        </AuthenticatedLayout>
    );
}
