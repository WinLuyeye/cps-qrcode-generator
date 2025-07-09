'use client'

import { useState, useRef } from 'react'
import QRCode from 'qrcode'
import { toPng } from 'html-to-image'
import logo from '../../public/CpsLogo.jpg'
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
    <div className="flex flex-col items-center gap-4 mt-6 px-4">
      <input
        type="text"
        placeholder="Entrez votre texte"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 w-full max-w-md rounded"
      />

      <button
        onClick={generateQRCode}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Générer QR Code
      </button>

      {qrCodeUrl && (
        <>
          <div ref={qrRef} className="relative w-[300px] h-[300px] bg-white">
            <Image
              src={qrCodeUrl}
              alt="QR Code"
              width={300}
              height={300}
              className="w-full h-full object-contain"
              unoptimized
            />
            <Image
              src={logo}
              alt="Logo"
              width={64}
              height={64}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            />
          </div>
<div className='flex gap-8'>
<button
            onClick={downloadQRCode}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Télécharger en PNG
          </button>

          <button
            onClick={resetAll}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Réinitialiser
          </button>
</div>

        </>
      )}
    </div>
  )
}

export default QRCodeGenerator
