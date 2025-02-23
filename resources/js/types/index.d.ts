import { Config } from 'ziggy-js';

export interface User {
    net_zcoins: number;
    is_admin: boolean;
    id: number;
    username: string;
    member_id: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    mobile_number?: string;
    email_verified_at?: string;
    address?: string;
    address2?: string;
    province?: string;
    city?: string;
    zipcode?: string;
    country?: string;
    bank_name?: string;
    account_name?: string;
    account_number?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
