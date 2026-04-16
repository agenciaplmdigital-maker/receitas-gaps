'use client'

import { useEffect, useState } from 'react'
import { useLocale } from '@/context/LocaleContext'
import { getMessage } from '@/lib/translations'
import { Download, BookOpen } from 'lucide-react'

export default function DownloadEbookPage() {
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleDownloadPDF = async () => {
    setIsLoading(true)
    try {
      // Load html2pdf library
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
      document.head.appendChild(script)

      script.onload = async () => {
        try {
          // Fetch the HTML content
          const response = await fetch('/downloads/protocolo-gaps.html')
          const htmlContent = await response.text()

          // Parse HTML to extract just the content
          const parser = new DOMParser()
          const doc = parser.parseFromString(htmlContent, 'text/html')

          // Get the book element
          const bookElement = doc.querySelector('.book')
          if (!bookElement) throw new Error('Ebook content not found')

          // Create element to print
          const element = document.createElement('div')
          element.innerHTML = bookElement.innerHTML
          element.style.backgroundColor = '#fbf6ec'
          element.style.padding = '20px'

          // Configure pdf options
          const opt = {
            margin: 10,
            filename: 'Protocolo_GAPS_EBook.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
          }

          // Generate PDF
          ;(window as any).html2pdf().set(opt).from(element).save()

          setIsLoading(false)
        } catch (error) {
          console.error('Error generating PDF:', error)
          alert('Erro ao gerar PDF. Tente novamente ou use "Imprimir > Salvar como PDF" no seu navegador.')
          setIsLoading(false)
        }
      }

      script.onerror = () => {
        alert('Erro ao carregar biblioteca de PDF. Tente novamente.')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-beige via-white to-beige px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-olive rounded-full mb-4">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-olive mb-3">
            {getMessage(locale, 'download.title', 'Baixar E-book GAPS')}
          </h1>
          <p className="text-lg text-sage">
            {getMessage(locale, 'download.subtitle', 'Protocolo GAPS completo em PDF')}
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-olive/10">
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">📖</div>
              <div>
                <h3 className="font-bold text-olive mb-1">Conteúdo Completo</h3>
                <p className="text-gray-600 text-sm">13 capítulos + capa com design profissional</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-2xl">📱</div>
              <div>
                <h3 className="font-bold text-olive mb-1">Compatível com Tudo</h3>
                <p className="text-gray-600 text-sm">Funciona em celular, tablet e computador</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-2xl">⚡</div>
              <div>
                <h3 className="font-bold text-olive mb-1">Download Imediato</h3>
                <p className="text-gray-600 text-sm">Gera o PDF na hora e começa o download</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-2xl">🔒</div>
              <div>
                <h3 className="font-bold text-olive mb-1">Privado</h3>
                <p className="text-gray-600 text-sm">Nenhum dado é enviado para servidor</p>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownloadPDF}
            disabled={isLoading}
            className="w-full bg-olive hover:bg-[#445025] text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin">⏳</div>
                {getMessage(locale, 'download.generating', 'Gerando PDF...')}
              </>
            ) : (
              <>
                <Download size={24} />
                {getMessage(locale, 'download.button', 'Baixar E-book em PDF')}
              </>
            )}
          </button>
        </div>

        {/* Alternative Option */}
        <div className="bg-terracotta/10 border-l-4 border-terracotta rounded-lg p-6 mb-8">
          <h3 className="font-bold text-terracotta mb-2 flex items-center gap-2">
            <span>💡</span> Alternativa
          </h3>
          <p className="text-gray-700 text-sm mb-3">
            Se o botão acima não funcionar, você pode:
          </p>
          <ol className="text-sm text-gray-700 space-y-2 ml-4">
            <li>1. Acesse: <a href="/downloads/protocolo-gaps.html" className="text-olive font-semibold hover:underline" target="_blank">E-book Interativo</a></li>
            <li>2. Pressione: <kbd className="bg-gray-200 px-2 py-1 rounded font-mono">Ctrl + P</kbd> (ou <kbd className="bg-gray-200 px-2 py-1 rounded font-mono">Cmd + P</kbd>)</li>
            <li>3. Clique em: <strong>Salvar como PDF</strong></li>
          </ol>
        </div>

        {/* Warning for Mobile */}
        {isMobile && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6">
            <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
              <span>📱</span> Dica para Celular
            </h3>
            <p className="text-yellow-700 text-sm">
              Se a geração do PDF levar muito tempo, tente em um computador ou tablet para melhor performance.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
