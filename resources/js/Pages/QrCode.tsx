import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';

export default function QrCodePage() {
    const { auth } = usePage().props;
    const user = auth.user;

    // Use the current browser origin
    const appUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const registerUrl = `${appUrl}/register?sponsor_id=${user.id}`;

    // Create a ref to the QR code canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const downloadQRCode = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'qr-code.png';
            link.click();
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    QR Code
                </h2>
            }
        >
            <Head title="QR Code" />
            <div className="flex justify-center py-12">
                <div className="rounded-lg bg-white p-6 text-center shadow">
                    <h3 className="mb-4 text-lg font-semibold">
                        Your Sponsor QR Code
                    </h3>
                    <QRCodeCanvas
                        ref={canvasRef}
                        value={registerUrl}
                        size={256}
                    />
                    <div className="mt-4">
                        <button
                            onClick={downloadQRCode}
                            className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                        >
                            Download QR Code
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
