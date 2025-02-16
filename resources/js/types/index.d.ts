import { Config } from 'ziggy-js';

export interface User {
    official_member: boolean;
    is_admin: boolean;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
