import QRCodeGenerator from '@/components/QRCodeGenerator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Générateur de QR Code</h1>
        <QRCodeGenerator />
      </div>
    </main>
  )
}
