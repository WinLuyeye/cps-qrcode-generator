'use client'

import { useState, useRef } from 'react'
import QRCode from 'qrcode'
import { toPng } from 'html-to-image'
import logo from '../../public/CpsLogo.jpg'
import GrandLogoCps from '../../public/GrandLogoCps.png'
import Image from 'next/image'

const QRCodeGenerator = () => {
  const [text, setText] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const qrRef = useRef<HTMLDivElement>(null)

  const generateQRCode = async () => {
    if (!text.trim()) return

    const qr = await QRCode.toDataURL(text, { margin: 2, width: 300 })
    setQrCodeUrl(qr)
  }

  const downloadQRCode = async () => {
    if (!qrRef.current || !text.trim()) return

    const dataUrl = await toPng(qrRef.current)
    const safeFileName = text.trim().replace(/[^a-z0-9]/gi, '_').toLowerCase()

    const link = document.createElement('a')
    link.download = `${safeFileName || 'qrcode'}.png`
    link.href = dataUrl
    link.click()
  }

  const resetAll = () => {
    setText('')
    setQrCodeUrl('')
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-200 bg-white">
        <div className="flex justify-center mb-6">
          <Image
            src={GrandLogoCps}
            alt="Logo principal CPS"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
          Générateur de QR Code
        </h1>

        <input
          type="text"
          placeholder="Entrez votre texte"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 mb-6 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          onClick={generateQRCode}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition mb-8"
          aria-label="Générer QR Code"
        >
          Générer QR Code
        </button>

        {qrCodeUrl && (
          <>
            <div
              ref={qrRef}
              className="relative w-[300px] h-[300px] mx-auto mb-8 bg-white rounded-lg shadow-md"
            >
              <Image
                src={qrCodeUrl}
                alt="QR Code"
                width={300}
                height={300}
                className="object-contain rounded-lg"
                unoptimized
              />
              <Image
                src={logo}
                alt="Logo CPS"
                width={64}
                height={64}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-8">
              <button
                onClick={downloadQRCode}
                className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
                aria-label="Télécharger en PNG"
              >
                Télécharger en PNG
              </button>

              <button
                onClick={resetAll}
                className="flex-1 bg-red-500 text-white py-3 rounded hover:bg-red-600 transition"
                aria-label="Réinitialiser"
              >
                Réinitialiser
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default QRCodeGenerator
