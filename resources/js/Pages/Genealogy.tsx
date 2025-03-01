import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface GenealogyNode {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    referrals: GenealogyNode[];
}

interface GenealogyProps {
    genealogy: GenealogyNode; // The root node (current user)
}

function RenderGenealogyNode({
    node,
    level = 0,
    sponsor,
}: {
    node: GenealogyNode;
    level?: number;
    sponsor?: string;
}) {
    const isRoot = level === 0;

    return (
        <li>
            <div className={`org-node ${isRoot ? 'is-root' : ''}`}>
                <div className="text-lg font-semibold">
                    {node.first_name} {node.last_name}
                </div>
                <div className="text-xs text-gray-600">{node.email}</div>
                {/* Only non-root nodes show the level */}
                {!isRoot && (
                    <div className="mt-1 text-xs text-purple-600">
                        Level {level}
                    </div>
                )}
                {sponsor && (
                    <div className="text-xs text-gray-500">
                        Sponsor: {sponsor}
                    </div>
                )}
            </div>
            {node.referrals && node.referrals.length > 0 && (
                <ul>
                    {node.referrals.map((child) => (
                        <RenderGenealogyNode
                            key={child.id}
                            node={child}
                            level={level + 1}
                            sponsor={`${node.first_name} ${node.last_name}`}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

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
                        <div className="org-container">
                            <ul className="org-tree">
                                <RenderGenealogyNode node={genealogy} />
                            </ul>
                        </div>

                        {/* Inline CSS; adjust or move these styles as needed */}
                        <style>{`
              /* Container: add extra padding around the tree */
              .org-container {
                text-align: center;
                white-space: nowrap;
                overflow-x: auto;
                overflow-y: auto;
                max-height: 600px;
                border: 1px solid #eee;
                padding: 20px;
              }

              /* Org tree container */
              .org-tree {
                padding-top: 20px;
                list-style: none;
                margin: 0;
                display: inline-block;
                position: relative;
              }

              /* Add vertical spacing between levels */
              .org-tree li ul {
                margin-top: 20px;
              }

              .org-tree ul {
                list-style: none;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
              }

              /* Each node: reduced vertical gap and horizontal margin */
              .org-tree li {
                text-align: center;
                position: relative;
                display: inline-block;
                vertical-align: top;
                margin: 0 1rem;
                padding-top: 0.5rem;
              }

              /* Remove connector lines */
              .org-tree li::before,
              .org-tree li::after,
              .org-tree li ul::before {
                content: none !important;
              }

              /* Node "card" */
              .org-node {
                display: inline-block;
                position: relative;
                background-color: #f9f9f9;
                border: 1px solid #ccc;
                border-radius: 6px;
                padding: 0.75rem 1rem;
                min-width: 140px;
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
              }

              /* Downward arrow for non-root nodes, centered with extra vertical space */
              .org-node::before {
                content: "";
                position: absolute;
                top: -15px;  /* moved up for extra vertical spacing */
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid #ccc;
              }

              /* Hide arrow for the root node (current user) */
              .org-node.is-root::before {
                content: none;
              }
            `}</style>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
