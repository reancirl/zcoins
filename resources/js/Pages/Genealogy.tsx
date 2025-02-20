import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export interface GenealogyNode {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    referrals: GenealogyNode[];
}

interface GenealogyProps {
    genealogy: GenealogyNode; // The root node
}

interface GenealogyTreeProps {
    node: GenealogyNode;
    level?: number;
}

const GenealogyTree: React.FC<GenealogyTreeProps> = ({ node, level = 0 }) => {
    return (
        <ul className="ml-6 list-disc">
            <li>
                <div className="py-1">
                    {node.first_name} {node.last_name} ({node.email}){' '}
                    {level > 0 && (
                        <span className="text-sm text-red-500">
                            - Level {level}
                        </span>
                    )}
                </div>
                {node.referrals && node.referrals.length > 0 && (
                    <div className="ml-4 border-l pl-4">
                        {node.referrals.map((child) => (
                            <GenealogyTree
                                key={child.id}
                                node={child}
                                level={level + 1}
                            />
                        ))}
                    </div>
                )}
            </li>
        </ul>
    );
};

export default function Genealogy({ genealogy }: GenealogyProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Genealogy
                </h2>
            }
        >
            <Head title="Genealogy" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <h1 className="mb-4 text-2xl font-bold">
                            Genealogy Tree
                        </h1>
                        <GenealogyTree node={genealogy} level={0} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
